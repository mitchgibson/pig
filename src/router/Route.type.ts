import { Component } from "../core";
import { RouteNode } from "./route-node/route-node";

export type RouteSlot = { new (...args: any[]): Component } | [{ new (...args: any[]): Component }, ...args: any[]];
export type RouteSlots = Record<string, RouteSlot>;
export type RouteResolve = (node: RouteNode, state: Record<string, string>) => Promise<any>;
export type RouteResolvers = { [key: string]: RouteResolve };
export type RouteGuard = () => Promise<boolean>;
export type RouteGuards = RouteGuard[];

export type Route = {
  path: string;
  slots?: RouteSlots;
  children?: Route[];
  resolve?: RouteResolvers;
  guards?: RouteGuards;
  state?: Record<string, string>;
};
