import { Route } from "../Route.type";
import { RouteNode } from "../route-node/route-node";
import { RouteNodeMatcher } from "../route-node-matcher/RouteNodeMatcher";

export class RouteTree {
    
    private nodes: RouteNode[] = [];
    private matcher: RouteNodeMatcher;

    constructor(routes: Route[]) {
        this.nodes = routes.map(route => new RouteNode(route));
        this.matcher = new RouteNodeMatcher(this.nodes);
    }

    public matchRoute(path: string): RouteNode | undefined {
        return this.matcher.matchRoute(path);
    }

    private buildRouteMap(routes: RouteNode[], map:Map<string, RouteNode>): Map<string, RouteNode> {
        routes.forEach(route => {
            map.set(this.reverseGetRoutePath(route), route);
            if (route.children && route.children.length > 0) {
                this.buildRouteMap(route.children, map);
            }
        });
        return map;
    }

    private reverseGetRoutePath(route: RouteNode): string {
        let path: string = '';
        while(route.parent) {
            if(path) {
                path = `${route.path}/${path}`;
            } else {
                path = route.path;
            }
            route = route.parent;
        }

        return path;
    }
}