import { State, Inject, RootState } from "../core";
import { ActiveRoute } from "./ActiveRoute.type";
import { RouteTree } from "./route-tree/route-tree";
import { Route } from "./Route.type";
import { RouteNode } from "./route-node/route-node";

type MutationOptions = { reload: boolean };
type Mutation = { path: string; options?: MutationOptions };

type RouteMarker = {
  route: RouteNode;
  activeRoute: ActiveRoute;
};

type RouteTrail = RouteMarker[];

export class RouterState extends State<ActiveRoute> {
  private tree: RouteTree;
  private routeAncestry: RouteTrail = [];
  private rootState: RootState = Inject(RootState);

  constructor(private routes: Route[]) {
    super({ path: "", state: {}, resolved: {} });
    this.tree = new RouteTree(this.routes);
  }

  public init(): void {
    window.addEventListener("popstate", (event) => {
      this.handleStateChange();
    });

    this.handleStateChange();
  }

  public mutate(mutation: Mutation): void {
    window.history.pushState({}, "", mutation.path);
    this.handleStateChange(window.location, mutation.options);
  }

  private handleStateChange(location: Location = window.location, options?: MutationOptions): void {
    const path = location.pathname;
    const route = this.getRouteNode(path);
    if (route) {
      this.startTransition(route, location, options);
    }
  }

  private async startTransition(route: RouteNode, location: Location, options?: MutationOptions): Promise<void> {
    const fromRoute = this.peek();
    this.emit("transition-start", { from: fromRoute, to: route });

    const path = location.pathname;
    const activeRoute = await this.createActiveRoute(route, route.getState(path));

    if (options?.reload === false && activeRoute.route === this.peek().route) {
      return;
    }
    await this.transition(activeRoute, location);
  }

  private async transition(activeRoute: ActiveRoute, location: Location): Promise<void> {
    const path = location.pathname;
    const params = new URLSearchParams(location.search);
    
    activeRoute.params = {};
    for (const [key, value] of params) {
      activeRoute.params[key] = value;
    }


    console.log("Transitioning", path);
    const fromRoute = this.peek();
    window.history.replaceState(activeRoute.state, "", path + location.search);
    console.log("Active Route", activeRoute);
    this.next(activeRoute);
    await this.activateRoute(activeRoute.route!, path);
    this.emit("transition-end", { from: fromRoute, to: activeRoute });
  }

  private async activateRoute(route: RouteNode, path: string): Promise<void> {
    const markerNodes: RouteNode[] = [];

    let current: RouteNode | undefined = route;
    while (current) {
      markerNodes.push(current);
      current = current.parent;
    }

    const routeNodesPath = markerNodes.reverse();

    for (const routeNode of routeNodesPath) {
      const activeRoute = await this.createActiveRoute(routeNode, routeNode.getState(path));
      this.routeAncestry.push({ route: routeNode, activeRoute });
      this.fillSlots(routeNode);
    }
  }

  private async createActiveRoute(route: RouteNode, state: Record<string, string> = {}): Promise<ActiveRoute> {
    const resolved = await this.resolveRoute(route, state);

    return {
      path: route.path,
      state,
      resolved,
      route,
    };
  }

  private async resolveRoute(routeNode: RouteNode, state: Record<string, string>): Promise<{}> {
    if (routeNode.route.resolve && Object.keys(routeNode.route.resolve).length > 0) {
      const resolved: { [key: string]: any } = {};
      for (const key in routeNode.route.resolve) {
        resolved[key] = await routeNode.route.resolve[key](routeNode, state);
      }
      return resolved;
    }
    return {};
  }

  private fillSlots(route: RouteNode): void {
    for (const slot in route.slots) {
      let componentPrototype = route.slots[slot] as any;
      let args: any[] = [];
      if (route.slots[slot] instanceof Array) {
        const slotArray = route.slots[slot] as any[];
        if (slotArray.length === 0) throw new Error("No component found in slot array");
        componentPrototype = slotArray.shift();
        args = slotArray;
      }

      const outletComponent = this.rootState.peek()?.findComponentByAttribute("router-slot", slot);

      if (outletComponent) {
        outletComponent.clearChildren();
        outletComponent.insertChild(new componentPrototype(...args));
      } else {
        console.error(`No router outlet found for slot ${slot}`);
      }
    }
  }

  private getRouteNode(path: string): RouteNode | undefined {
    return this.tree.matchRoute(path);
  }
}
