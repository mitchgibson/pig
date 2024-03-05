import { Component } from "../core/Component";
import { Chart } from "./Chart.component";

export class ChartFactory {

    public create(container: Component): Chart {
        return new Chart(container)
    }
}