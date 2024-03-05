import { Component } from "../core";

export class RouterSlot extends Component {
    constructor(slug: string) {
        super("div");
        this.attribute("router-slot", slug);
    }
}