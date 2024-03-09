import { Inject } from "../../core/dependency-injection/Inject";
import { BackdropService } from "../../core/modules/backdrop/Backdrop.service";
import { Component } from "../../core/Component";
import { Menu } from "./Menu.component";
import { MenuItem } from "./MenuItem.component";

export class MenuTrigger extends Component {
  private showMenu: boolean = false;
  private backdropService = Inject(BackdropService);

  private _menuComponent: Menu = new Menu();
  private _triggerComponent: Component = new Component();

  constructor(trigger?: Component, items?: MenuItem[]) {
    super();
    this.style("position", "relative");
    this.style("cursor", "pointer");
    if(trigger) this.setTrigger(trigger);
    if(items) this.setMenuItems(items);
  }

  public setTrigger(trigger: Component): this {
    this._triggerComponent = trigger;
    this._triggerComponent.event("click", this.toggleMenu.bind(this));
    this.insertChild(this._triggerComponent, 0);
    return this;
  }

  public setMenuItems(items: MenuItem[]): this {
    items.forEach((item) => {
      item.event("click", this.toggleMenu.bind(this));
    });
    this._menuComponent.children(items);
    return this;
  }

  public getMenuComponent(): Menu {
    return this._menuComponent;
  }

  public direction(direction: "left" | "right"): this {
    if(direction === "right") {
      this._menuComponent.style("right", "auto");
      this._menuComponent.style("left", "0");
    }

    if(direction === "left") {
      this._menuComponent.style("left", "auto");
      this._menuComponent.style("right", "0");
    }
    return this;
  }

  public disable(): this {
    this._triggerComponent.disable();
    super.disable();
    return this;
  }

  public enable(): this {
    this._triggerComponent.enable();
    super.enable();
    return this;
  }

  private toggleMenu(): void {
    this.showMenu = !this.showMenu;
    if (this.showMenu) {
      this.backdropService.show(this.onHide.bind(this));
      this.onShow();
    } else {
      this.backdropService.hide();
      this.onHide();
    }
  }

  private onHide(): void {
    this.removeChild(this._menuComponent);
    this.showMenu = false;
  }

  private onShow(): void {
    this.insertChild(this._menuComponent);
    this.showMenu = true;
  }
}
