import { Component } from "../../core/Component";

export class Tooltip extends Component {
  private _tipContent: Component = new Component();
  private _trigger: Component;
  private _delay: number = 700;
  private _show: boolean = false;

  constructor(trigger: Component, content: string) {
    super();
    this._trigger = trigger;
    this._tipContent.content(content);
    this._tipContent.style("display", "none");
    this._tipContent.style("position", "absolute");
    this._tipContent.style("z-index", "90");

    this.children([this._trigger, this._tipContent]);

    this.style("position", "relative");
    this.setupEvents();
  }

  private setupEvents(): void {
    this._trigger.event("mouseenter", () => {
      this._show = true;
      setTimeout(() => {
        if (!this._show) return;
        this._tipContent.style("display", "block");
        this._show = false;
      }, this._delay);
    });
    this._trigger.event("mouseleave", () => {
      this._show = false;
      this._tipContent.style("display", "none");
    });
  }

  public setContent(content: string): this {
    this._tipContent.content(content);
    return this;
  }

  public position(position: "top" | "bottom" | "left" | "right"): this {
    switch (position) {
      case "top":
        this._tipContent.style("bottom", "100%");
        this._tipContent.style("left", "50%");
        this._tipContent.style("transform", "translateX(-50%)");
        break;
      case "bottom":
        this._tipContent.style("top", "100%");
        this._tipContent.style("left", "50%");
        this._tipContent.style("transform", "translateX(-50%)");
        break;
      case "left":
        this._tipContent.style("right", "100%");
        this._tipContent.style("top", "50%");
        this._tipContent.style("transform", "translateY(-50%)");
        break;
      case "right":
        this._tipContent.style("left", "100%");
        this._tipContent.style("top", "50%");
        this._tipContent.style("transform", "translateY(-50%)");
        break;
    }
    return this;
  }

  public delay(delay: number): this {
    this._delay = delay;
    return this;
  }
}
