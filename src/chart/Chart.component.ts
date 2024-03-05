import { Chart as ChartJs, ChartConfiguration, ChartData, ChartTypeRegistry } from "chart.js";
import { Component } from "../core/Component";

export class Chart extends Component {
  protected _container: Component;
  protected _config: Partial<ChartConfiguration> = {};
  protected _data: Partial<ChartData> = {};
  protected _chart?: ChartJs;

  constructor(container: Component) {
    super("canvas");
    this._container = container;
  }

  public config(config: Partial<ChartConfiguration>): this {
    this._config = config;
    return this;
  }

  public data(data: ChartData): this {
    this._config.data = data;
    return this;
  }

  public type(type: keyof ChartTypeRegistry): this {
    this._config.type = type;
    return this;
  }

  public render(): HTMLElement {
    if (this._chart) this._chart.destroy();
    this._chart = new ChartJs(this.getElement() as HTMLCanvasElement, this._config as ChartConfiguration);
    return super.render();
  }
}
