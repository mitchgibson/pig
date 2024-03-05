import { describe, it, expect } from "vitest";
import { RouteNode } from "./route-node";
import { RouteAdapter } from "../route-adapter/RouteAdapter";

describe("RouteNode", () => {
  describe("#isMatch", () => {
    it("should match on path of empty string", () => {
      const route = {
        path: "",
        slots: {},
      };
      const routeNode = new RouteNode(route);
      expect(routeNode.isMatch("")).toBe(true);
    });
    it("should match on path /", () => {
      const route = {
        path: "",
        slots: {},
      };
      const routeNode = new RouteNode(route);
      expect(routeNode.isMatch("/")).toBe(true);
    });

    it("should match on path /:id", () => {
      const route = {
        path: ":id",
        slots: {},
      };
      const routeNode = new RouteNode(route);
      expect(routeNode.isMatch("/123")).toBe(true);
    });

    it("should match on path /:id/:tab", () => {
      const route = {
        path: ":id/:tab",
        slots: {},
      };
      const routeNode = new RouteNode(route);
      expect(routeNode.isMatch("/123/tab")).toBe(true);
    });

    it("should match on path /:id/:tab/edit", () => {
      const route = {
        path: ":id/:tab/edit",
        slots: {},
      };
      const routeNode = new RouteNode(route);
      expect(routeNode.isMatch("/123/tab/edit")).toBe(true);
    });
  });

  describe("#getState", () => {
    it("should get state from path /:id", () => {
      const route = {
        path: ":id",
        slots: {},
      };
      const routeNode = new RouteNode(route);
      expect(routeNode.getState("123")).toEqual({ id: "123" });
    });

    it("should get state from path /:id/:tab", () => {
      const route = {
        path: ":id/:tab",
        slots: {},
      };
      const routeNode = new RouteNode(route);
      expect(routeNode.getState("123/tab")).toEqual({ id: "123", tab: "tab" });
    });

    it("should get state from path /:id/:tab/edit", () => {
      const routes = RouteAdapter.toRouteNodes([
        {
          path: ":id",
          slots: {},
          children: [
            {
              path: ":tab",
              slots: {},
              children: [
                {
                  path: "edit",
                  slots: {},
                },
              ],
            },
          ],
        },
      ]);

      routes[0].children![0].parent = routes[0];
      routes[0].children![0].children![0].parent = routes[0].children![0];

      const routeNode = routes[0].children![0].children![0];
      expect(routeNode.getState("123/profile/edit")).toEqual({ id: "123", tab: "profile" });
    });
  });
});
