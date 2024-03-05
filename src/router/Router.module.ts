import { Application, Inject } from "../core";
import { Route } from "./Route.type";
import { RouterService } from "./Router.service";
import { RouterState } from "./Router.state";

export class RouterModule {
  constructor(app: Application, routes: Route[]) {
    app.provide([[RouterState, routes], RouterService]);
    Inject(RouterService);

    const routerState = Inject(RouterState);
    setTimeout(() => {
      routerState.init();
    });
  }
}
