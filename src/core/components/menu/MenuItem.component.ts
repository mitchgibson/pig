import { Component } from "../../Component";

export class MenuItem extends Component {
    constructor() {
        super("a");
        this.attribute("role", "menuitem");
        this.attribute("tabindex", "-1");
        this.cssClass(["block", "px-4", "py-2", "text-sm", "text-gray-700", "hover:bg-gray-100"]);
    }
}