import { Component, Inject } from "../core";
import { ActiveRoute } from "./ActiveRoute.type";
import { RouterSlot } from "./RouterSlot.component";
import { RouterState } from "./Router.state";

export class RouterService {
  private routerState: RouterState = Inject(RouterState);

  public navigate(path: string, options?: { reload: boolean }) {
    this.routerState.mutate({ path, options });
  }

  public createOutlet(slot: string): Component {
    const outlet = new RouterSlot(slot);
    return outlet;
  }

  public activeRoute():ActiveRoute {
    return { ...this.routerState.peek() };
  }
}
