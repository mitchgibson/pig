import { describe, it, expect, beforeEach } from 'vitest';
import { RouteAdapter } from './RouteAdapter';
import { Route } from '../Route.type';
import { Component } from '../../core';
import { RouteNode } from '../route-node/route-node';

describe("RouteAdapter", () => {
    let routes: Route[] = [];

    beforeEach(() => {
        routes = [
            {
                path: "",
                slots: {
                    "layout": Component
                },
                children: [
                    {
                        path: ":id",
                        slots: {
                            "content": Component,
                        },
                        children: [
                            {
                                path: ":tab",
                                slots: {
                                    "tab": Component,
                                },
                                children: [
                                    {
                                        path: "edit",
                                        slots: {
                                            "editor": Component,
                                        }
                                    }
                                ]
                            },
                            {
                                path: "user/profile",
                                slots: {
                                    "editor": Component,
                                }
                            }
                            
                        ]
                    },
                    {
                        path: "static",
                        slots: {
                            "static": Component,
                        }
                    },
                    {
                        path: "admin",
                        slots: {
                            "layout": Component
                        },
                    }
                ]
            },
        ];
    });


    it("should convert routes to route nodes", () => {
        const routeNodes = RouteAdapter.toRouteNodes(routes);
        
        const traverse = (node: Route) => {
            expect(node).toBeInstanceOf(RouteNode);
            if (node.children && node.children.length > 0) {
                node.children.forEach(traverse);
            }
        };

        routeNodes.forEach(traverse);
    });
});