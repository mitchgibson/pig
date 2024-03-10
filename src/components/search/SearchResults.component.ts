import { Component } from "../../core";
import { Container } from "../container";

export class SearchResults extends Container {
  protected _closeOnClick: boolean = true;
  protected _items: Component[] = [];

  constructor() {
    super();
    this.itemsCenter().overflow();
    this.style("max-height", "400px");
    this.style("z-index", "80");
    this.style("position", "absolute");
    this.style("width", "100%");
    this.border();
    this.rounded();
  }

  public disableCloseOnClick(): void {
    this._closeOnClick = false;
    this.items();
  }

  public enableCloseOnClick(): void {
    this._closeOnClick = true;
    this.items();
  }

  public items(items: Component[] = []): void {
    this._items = items;
    this.clearChildren();
    this._items.forEach((item: Component) => {
      const itemComponent = new Container().fillWidth().children([item]);
      if (this._closeOnClick) {
        itemComponent.event("click", () => this.clearChildren());
      }
      this.insertChild(itemComponent);
    });
  }
}
