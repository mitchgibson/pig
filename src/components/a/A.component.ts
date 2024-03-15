import { Component } from "../../core";

export class A extends Component {
  constructor() {
    super("a");
  }

  public href(href: string): this {
    this.attribute("href", href);
    return this;
  }

  public target(target: "_blank" | "_self" | "_parent" | "_top" | string): this {
    this.attribute("target", target);
    return this;
  }
}
