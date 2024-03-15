import { Component, ComponentEventCallback } from "../../core";

export class Button extends Component {
  constructor() {
    super("button");
  }

  public click(callback: ComponentEventCallback): this {
    this.event("click", callback);
    return this;
  }
}
