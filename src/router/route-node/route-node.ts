import { Component } from "../../core";
import { Route } from "../Route.type";

export class RouteNode implements Route {
  path: string;
  slots?: Record<string, typeof Component | [typeof Component, ...args: any[]]>;
  children?: RouteNode[];
  parent?: RouteNode;
  pattern: string = "";
  route: Route;

  constructor(route: Route, parent?: RouteNode) {
    this.route = route;
    this.path = route.path;
    this.parent = parent;
    this.pattern = this.buildPattern();
    this.slots = route.slots;
    this.children = route.children?.map((child) => new RouteNode(child, this));
    this.parent = parent;
  }

  public hasChildren(): boolean {
    return !!this.children && this.children.length > 0;
  }

  public getState(path: string): Record<string, string> {
    const partsOfRoute = this.getFullRoutePath(this).split("/");
    const partsOfPath = path.split("/");
    const state: { [key: string]: any } = {};

    partsOfRoute.forEach((part, index) => {
      if (part.startsWith(":")) {
        const key = part.replace(":", "");
        const value = partsOfPath[index];
        state[key] = value;
      }
    });
    return state;
  }

  private getFullRoutePath(route: RouteNode): string {
    let path = route.path;
    while (route.parent) {
      path = `${route.parent.path}/${path}`;
      route = route.parent;
    }

    return path;
  }

  public isMatch(path: string): boolean {
    path = this.getCleanPath(path);
    const segments = path.split("/");
    const routeSegments = this.path.split("/");

    if (segments.length !== routeSegments.length) {
      return false;
    }

    for (let i = 0; i < segments.length; i++) {
      const segment = segments[i];
      const routeSegment = routeSegments[i];
      if (routeSegment.startsWith(":")) {
        continue;
      }
      if (segment !== routeSegment) {
        return false;
      }
    }

    return true;
  }

  public isExactMatch(path: string): boolean {
    path = this.getCleanPath(path);
    const routePath = this.path.startsWith("/") ? this.path.substring(1) : this.path;

    return path === routePath;
  }

  private buildPattern(): string {
    const partsOfRoute = this.path.split("/");
    let pattern = "";
    partsOfRoute.forEach((part) => {
      if (part.startsWith(":")) {
        pattern += `(.*?)[/$?]?`;
      } else {
        pattern += `${part}`;
      }
    });

    return pattern;
  }

  private getCleanPath(path: string): string {
    return path.startsWith("/") ? path.substring(1) : path;
  }
}
