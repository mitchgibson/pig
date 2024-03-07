import { Component } from "../../core";
import { Container } from "../container";

export class SearchResults<T> extends Container {
  protected _closeOnClick: boolean = true;
  protected _items: T[] = [];

  constructor(private _adapter: (item: T) => Component) {
    super();
    this.itemsCenter().overflow();
    this.style("max-height", "400px");
    this.style("z-index", "80");
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

  public items(items: T[] = this._items): void {
    this._items = items;
    this.clearChildren();
    this._items.forEach((item: T) => {
      const itemComponent = new Container().fillWidth().children([this._adapter(item)]);
      if (this._closeOnClick) {
        itemComponent.event("click", () => this.clearChildren());
      }
      this.insertChild(itemComponent);
    });
  }
}
