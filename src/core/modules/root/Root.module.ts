import { Application } from "../../Application";
import { RootState } from "./Root.state";

export class RootModule {
    constructor(app: Application) {
        app.provide([
            [RootState]
        ]);
    }
}