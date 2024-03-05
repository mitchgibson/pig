import { Application } from "../../Application";
import { BackdropService } from "./Backdrop.service";

export class BackdropModule {
  constructor(app: Application) {
    app.provide([
      BackdropService
    ]);
  }
}
