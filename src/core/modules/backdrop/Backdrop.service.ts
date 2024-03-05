import { Inject } from "../../dependency-injection/Inject.ts";
import { RootState } from "../root/Root.state.ts";
import { Backdrop } from "./Backdrop.component.ts";

export class BackdropService {
  private rootState: RootState = Inject(RootState);
  private backdrop: Backdrop = new Backdrop();

  public show(onHide?: () => void): void {
    this.backdrop = new Backdrop();
    this.backdrop.event("click", () => {
      this.hide();
      if (onHide) {
        onHide();
      }
    });
    this.rootState.peek()?.insertChild(this.backdrop);
  }

  public hide(): void {
    this.rootState.peek()?.removeChild(this.backdrop);
  }
}
