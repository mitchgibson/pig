import { Application } from "../Application";
import { APPLICATION_TOKEN } from "./ApplicationToken.constant";

export function App(): Application {
    const root = globalThis as any;
    const app: Application = root[APPLICATION_TOKEN];
    return app;
}