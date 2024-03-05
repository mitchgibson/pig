import { describe, it, expect, beforeEach } from "vitest";
import { RouteTreeBuilder } from "./RouteTreeBuilder";
import { Route } from "../route.type";
import { Component } from "../../core";
import { RouteNode } from "../route-node/route-node";

describe("RouteTreeBuilder", () => {
  let routes: Route[] = [];

  beforeEach(() => {
    routes = [
      {
        path: "",
        slots: {
          layout: Component,
        },
        children: [
          {
            path: ":id",
            slots: {
              content: Component,
            },
            children: [
              {
                path: ":tab",
                slots: {
                  tab: Component,
                },
              },
              {
                path: ":tab/edit",
                slots: {
                  editor: Component,
                },
              },
            ],
          },
          {
            path: "static",
            slots: {
              static: Component,
            },
          },
          {
            path: "admin",
            slots: {
              layout: Component,
            },
          },
        ],
      },
    ];
  });

  it("should set the parents of all children in the tree", () => {
    const routeNodes: RouteNode[] = new RouteTreeBuilder().build(routes);

    const traverse = (node: RouteNode, parent?: RouteNode) => {
      expect(node).toBeInstanceOf(RouteNode);
      expect(node!.parent).toBe(parent);
      expect(node!.path).toBe(node.path);

      if (node.children && node.children.length > 0) {
        node.children.forEach((child) => {
          traverse(child, node);
        });
      }
    };

    routeNodes.forEach((route) => {
      traverse(route);
    });
  });
});
