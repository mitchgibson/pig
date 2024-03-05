import { describe, it, expect, beforeEach } from 'vitest';
import { Component } from '../../core';
import { Route } from '../route.type';
import { RouteTree } from './route-tree';

describe('RouteTree', () => {

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


    it("should match root route", () => {
        const tree = new RouteTree(routes);
        expect(tree.matchRoute("/")!.path).toEqual(routes[0].path);
    });

    it("should match /static route", () => {
        const tree = new RouteTree(routes);
        expect(tree.matchRoute("/static")!.path).toEqual(routes[0].children![1].path);
    });

    it("should match /admin route", () => {
        const tree = new RouteTree(routes);
        expect(tree.matchRoute("/admin")!.path).toEqual(routes[0].children![2].path);
    });

    it("should match /:id dynamic route", () => {
        const tree = new RouteTree(routes);
        expect(tree.matchRoute("/123")!.path).toEqual(routes[0].children![0].path);
    });

    it("should match /:id/:tab dynamic route", () => {
        const tree = new RouteTree(routes);
        expect(tree.matchRoute("/123/profile")!.path).toEqual(routes[0].children![0].children![0].path);
    });

    it("should match /:id/:tab/edit dynamic route", () => {
        const tree = new RouteTree(routes);
        expect(tree.matchRoute("/123/profile/edit")!.path).toEqual(routes[0].children![0].children![0].children!    [0].path);
    });

    it("should match on /1", () => {
        routes = [
            {
                path: "",
                slots: {
                    "main": Component
                },
                children: [
                    {
                        path: ":item",
                        slots: {
                            "item": Component
                        }
                    },
                    {
                        path: "static",
                        slots: {
                            "static": Component
                        }
                    }
                ]
            }
        ];

        const tree = new RouteTree(routes);
        expect(tree.matchRoute("/1")!.path).toEqual(routes[0].children![0].path);
    });
});