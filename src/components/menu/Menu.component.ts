import { Component } from "../../core/Component";

export class Menu extends Component {
  constructor() {
    super("div");
    this.attribute("role", "menu");
    this.attribute("aria-orientation", "vertical");
    this.attribute("aria-labelledby", "user-menu-button");
    this.attribute("tabindex", "-1");

    this.style("position", "absolute");
    this.cssClass([
      "right-0",
      "z-10",
      "mt-2",
      "w-48",
      "origin-top-right",
      "rounded-md",
      "bg-white",
      "py-1",
      "shadow-lg",
      "ring-1",
      "ring-black",
      "ring-opacity-5",
      "focus:outline-none",
    ]);
  }
}
