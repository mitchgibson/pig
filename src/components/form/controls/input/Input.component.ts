import { Component } from "../../../../core/Component";

type InputType = "text" | "number" | "password" | "email" | "tel" | "url" | "search" | "date" | "time" | "datetime-local" | "month" | "week" | "color";

export class Input extends Component {
    protected getStylesKey(): string {
        return "Input";
    }

    public type(value: InputType): this {
        this.attribute("type", value);
        return this;
    }

    public name(value: string): this {
        this.attribute("name", value);
        return this;
    }

    public form(value: string): this {
        this.attribute("form", value);
        return this;
    }

    public disabled(value:boolean): this {
        this.attribute("disabled", value ? "true" : "false");
        return this;
    }

    public placeholder(value: string): this {
        this.attribute("placeholder", value);
        return this;
    }

    public focus(callback: (event: Event, context: Component) => void) {
        this.event("focus", (context: Component, event: Event) => {
            callback(event, context);
        });
        return this;
    }

    public blur(callback: (event: Event, context: Component) => void) {
        this.event("blur", (context: Component, event: Event) => {
            callback(event, context);
        });
        return this;
    }
}