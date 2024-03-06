import { Component } from "../../core/Component";

export class MenuItem extends Component {
  constructor() {
    super("a");
    this.attribute("role", "menuitem");
    this.attribute("tabindex", "-1");
    this.styles({
      display: "block",
      padding: "0.5rem 1rem",
      "text-decoration": "none",
      cursor: "pointer",
      "font-size": "0.875rem",
      "line-height": "1.25rem",
      "font-weight": "400",
      color: "#d4d4d8",
      "background-color": "transparent",
    });

    this.event("mouseenter", () => {
      this.styles({
        "background-color": "#0f172a",
        color: "#ffffff",
      });
    });

    this.event("mouseleave", () => {
      this.style("background-color", "transparent");
    });
  }
}
