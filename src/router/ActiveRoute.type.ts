import { RouteNode } from "./route-node/route-node";

export type ActiveRoute = {
    path: string;
    state: Record<string, any>;
    resolved: {};
    route?: RouteNode;
    params?: Record<string, string>;
};