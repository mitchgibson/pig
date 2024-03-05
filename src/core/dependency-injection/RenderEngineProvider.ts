import { Application } from "../Application";
import { Component } from "../Component";
import { APPLICATION_TOKEN } from "./ApplicationToken.constant";

export function RenderEngineProvider(): (component:Component) => any {
    const root = globalThis as any;
    const app: Application = root[APPLICATION_TOKEN];
    return app.renderEngine;
}