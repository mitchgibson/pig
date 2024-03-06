import { Inject } from "../../core/dependency-injection/Inject";
import { BackdropService } from "../../core/modules/backdrop/Backdrop.service";
import { Component } from "../../core/Component";
import { Menu } from "./Menu.component";

export class MenuTrigger extends Component {
  private showMenu: boolean = false;
  private backdropService = Inject(BackdropService);

  constructor(private trigger: Component, private menu: Menu) {
    super();
    this.style("position", "relative");
    this.style("cursor", "pointer");
    this.trigger.event("click", this.toggleMenu.bind(this));
    this.menu.getChildren().forEach((child) => {
        child.event("click", this.toggleMenu.bind(this));
    });
    this.children([this.trigger]);
  }

  public direction(direction: "left" | "right"): this {
    if(direction === "left") {
      this.menu.style("right", "auto");
      this.menu.style("left", "0");
    }

    if(direction === "right") {
      this.menu.style("left", "auto");
      this.menu.style("right", "0");
    }
    return this;
  }

  public disable(): this {
    this.trigger.disable();
    super.disable();
    return this;
  }

  public enable(): this {
    this.trigger.enable();
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
    this.removeChild(this.menu);
    this.showMenu = false;
  }

  private onShow(): void {
    this.insertChild(this.menu);
    this.showMenu = true;
  }
}
