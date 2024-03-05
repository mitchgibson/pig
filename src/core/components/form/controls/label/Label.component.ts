import { Component } from "../../../../Component";

export class Label extends Component {
    constructor() {
        super("label");
    }

    public for(forId: string): this {
        this.attribute("for", forId);
        return this;
    }
}