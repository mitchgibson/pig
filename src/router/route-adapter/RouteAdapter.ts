import { Route } from "../Route.type";
import { RouteNode } from "../route-node/route-node";

export class RouteAdapter {

    public static toRouteNodes(routes: Route[]): RouteNode[] {
        return routes.map((route) => new RouteNode(route));
    }
}