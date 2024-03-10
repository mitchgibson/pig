import { Component } from "../../core/Component";

export class MenuItem extends Component {
  constructor(tagName: string = "a") {
    super("a");
    this.attribute("role", "menuitem");
    this.attribute("tabindex", "-1");
  }
}
