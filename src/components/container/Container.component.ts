import { Component } from "../../core";

export class Container extends Component {
  constructor(tagName: string = "div") {
    super(tagName);
    this.styles({
      display: "flex",
      "flex-direction": "column",
    });
  }

  public flexGrow(): this {
    this.styles({
      "flex-grow": "1",
    });
    return this;
  }

  public fillScreen(): this {
    this.styles({
      width: "100vw",
      height: "100vh",
    });
    return this;
  }

  public fill(): this {
    this.styles({
      width: "100%",
      height: "100%",
    });
    return this;
  }

  public fillWidth(): this {
    this.styles({
      width: "100%",
    });
    return this;
  }

  public fillHeight(): this {
    this.styles({
      height: "100%",
    });
    return this;
  }

  public rounded(): this {
    this.styles({
      "border-radius": "6px",
    });
    return this;
  }

  public border(): this {
    this.styles({
      border: "1px solid #334155",
    });
    return this;
  }

  public row(): this {
    this.styles({
      "flex-direction": "row",
    });
    return this;
  }

  public col(): this {
    this.styles({
      "flex-direction": "column",
    });
    return this;
  }

  public justifyBetween(): this {
    this.styles({
      "justify-content": "space-between",
    });
    return this;
  }

  public justifyCenter(): this {
    this.styles({
      "justify-content": "center",
    });
    return this;
  }

  public justifyStart(): this {
    this.styles({
      "justify-content": "flex-start",
    });
    return this;
  }

  public itemsCenter(): this {
    this.styles({
      "align-items": "center",
    });
    return this;
  }

  public overflowY(): this {
    this.styles({
      "overflow-y": "auto",
    });
    return this;
  }

  public overflowX(): this {
    this.styles({
      "overflow-x": "auto",
    });
    return this;
  }

  public overflow(): this {
    this.styles({
      overflow: "auto",
    });
    return this;
  }

  public padding(size: string): this {
    this.styles({
      padding: size,
    });
    return this;
  }
}
