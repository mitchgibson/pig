import { RouteAdapter } from "../route-adapter/RouteAdapter";
import { Route } from "../Route.type";
import { RouteNode } from "../route-node/route-node";

export class RouteTreeBuilder {
  public build(routes: Route[]): RouteNode[] {
    return this.buildTree(RouteAdapter.toRouteNodes(routes));
  }

  private buildTree(routes: RouteNode[], parent?: RouteNode): RouteNode[] {
    routes.forEach((route) => {
      route.parent = parent;
      if (route.children && route.children.length > 0) {
        this.buildTree(route.children, route);
      }
    });
    return routes;
  }
}
