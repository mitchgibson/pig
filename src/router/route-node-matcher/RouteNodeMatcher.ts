import { RouteNode } from "../route-node/route-node";

export class RouteNodeMatcher {
  constructor(private routeNodes: RouteNode[]) {}

  public matchRoute(path: string): RouteNode {
    const matchedNode = this.findRouteNode(path, this.routeNodes);
    if (!matchedNode) throw new Error("No route found");
    return matchedNode;
  }

  private findRouteNode(path: string, nodes: RouteNode[]): RouteNode | undefined {
    for(const node of nodes) {
        if(node.isExactMatch(path)) return node;
    }

    let matchedNode: RouteNode | undefined;
    const segments = path.split("/");
    const remainingSegments: string[] = [...segments];

    for(const segment of segments) {
        for(const node of nodes) {
            if(node.isMatch(segment)) {
                remainingSegments.shift();
                matchedNode = node;
                if(!node.hasChildren() || remainingSegments.length === 0) {
                    return node
                };
                return this.findRouteNode(remainingSegments.join('/'), node.children || []);
            }
        }
    }

    return undefined;
  }
}
