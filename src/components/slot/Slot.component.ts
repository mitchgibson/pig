import { Component } from "../../core/Component";

export class Slot extends Component {
    constructor(slug: string) {
        super();
        this.attribute("slot", slug);
    }
}