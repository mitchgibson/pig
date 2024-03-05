import { Application } from "../core/Application";
import { ChartFactory } from "./Chart.factory";
import { Chart as ChartJs, registerables } from "chart.js";

export class ChartModule {
  constructor(app: Application) {
    ChartJs.register(...registerables);
    app.provide([ChartFactory]);
  }
}
