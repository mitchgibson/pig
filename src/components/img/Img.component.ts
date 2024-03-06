import { Component } from "../../core/Component";

export class Img extends Component {
    
    constructor() {
        super("img");
    }

    public src(src: string) {
        this.attribute("src", src);
        return this;
    }
}