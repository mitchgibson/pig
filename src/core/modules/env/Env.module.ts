import { Application } from "../../Application";
import { EnvService } from "./Env.service";

export class EnvModule {
    constructor(app: Application) {
        app.provide([EnvService]);
    }
}