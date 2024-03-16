import { Component } from "../../core/Component";

export class Menu extends Component {
  constructor() {
    super("div");
    this.attribute("role", "menu");
    this.attribute("aria-orientation", "vertical");
    this.attribute("aria-labelledby", "user-menu-button");
    this.attribute("tabindex", "-1");

    this.styles({
      "position": "absolute",
      "right": "0",
      "z-index": "80",
      "margin-top": "2px",
      "width": "12rem",
      "transform-origin": "top right",
      "background-color": "#020617",
      "color": "#a1a1aa",
      "box-shadow": "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
      "max-height": "250px",
      "overflow-y": "auto",
    });
  }
}
