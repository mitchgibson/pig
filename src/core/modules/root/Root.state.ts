import { Component } from "../../Component";
import { State } from "../../states/State";

export class RootState extends State<Component | null> {
  constructor() {
    super(null);
  }

  public mutate(mutation: Component): void {
    this.next(mutation);
  }
}
