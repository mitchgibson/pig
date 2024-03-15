import { Component } from "../../core/Component";

export class Img extends Component {
    
    constructor() {
        super("img");
    }

    public src(src: string) {
        this.attribute("src", src);
        return this;
    }

    public alt(alt: string) {
        this.attribute("alt", alt);
        return this;
    }
}