import { Component } from "../../Component";

export class Backdrop extends Component {
    
    constructor() {
        super("div");
        this.style("position", "fixed");
        this.style("inset", "0px");
    }
}