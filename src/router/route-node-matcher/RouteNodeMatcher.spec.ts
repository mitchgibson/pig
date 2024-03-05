import { expect, it, describe, beforeEach } from 'vitest';
import { RouteNodeMatcher } from './RouteNodeMatcher';
import { Route } from '../route.type';
import { Component } from '../../../components';
import { RouteAdapter } from '../route-adapter/RouteAdapter';

describe('RouteNodeMatcher', () => {
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

    it('should match route of empty string', () => {
        const routeNodes = RouteAdapter.toRouteNodes(routes);
        const routeNodeMatcher = new RouteNodeMatcher(routeNodes);
        const matchedNode = routeNodeMatcher.matchRoute('');
        expect(matchedNode.path).toBe('');
    });

    it('should match route :id', () => {
        const routeNodes = RouteAdapter.toRouteNodes(routes);
        const routeNodeMatcher = new RouteNodeMatcher(routeNodes);
        const matchedNode = routeNodeMatcher.matchRoute('/profile');
        expect(matchedNode.path).toBe(':id');
    });

    it('should match route :id/:tab', () => {
        const routeNodes = RouteAdapter.toRouteNodes(routes);
        const routeNodeMatcher = new RouteNodeMatcher(routeNodes);
        const matchedNode = routeNodeMatcher.matchRoute('/profile/tab');
        expect(matchedNode.path).toBe(':tab');
    });

    it('should match route :id/:tab/edit', () => {
        const routeNodes = RouteAdapter.toRouteNodes(routes);
        const routeNodeMatcher = new RouteNodeMatcher(routeNodes);
        const matchedNode = routeNodeMatcher.matchRoute('/123/tab/edit');
        expect(matchedNode.path).toBe('edit');
    });

    it('should match route :id/user/profile', () => {
        const routeNodes = RouteAdapter.toRouteNodes(routes);
        const routeNodeMatcher = new RouteNodeMatcher(routeNodes);
        const matchedNode = routeNodeMatcher.matchRoute('/123/user/profile');
        expect(matchedNode.path).toBe('user/profile');
    });

    it('should match route static', () => {
        const routeNodes = RouteAdapter.toRouteNodes(routes);
        const routeNodeMatcher = new RouteNodeMatcher(routeNodes);
        const matchedNode = routeNodeMatcher.matchRoute('/static');
        expect(matchedNode.path).toBe('static');
    });

    it('should match route admin', () => {
        const routeNodes = RouteAdapter.toRouteNodes(routes);
        const routeNodeMatcher = new RouteNodeMatcher(routeNodes);
        const matchedNode = routeNodeMatcher.matchRoute('/admin');
        expect(matchedNode.path).toBe('admin');
    });
});