import { Component, ComponentEventCallback } from "../../../../Component";
import { Input } from "./Input.component";

export class TextInput extends Input {
    constructor() {
        super("input");
        this.type("text");
    }

    public change(callback: ComponentEventCallback): this {
        this.event("change", callback);
        return this;
    }

    public keypress(key: string | ((event:KeyboardEvent) => boolean), callback: ComponentEventCallback): this {
        this.event("keypress", (context: Component, event: Event) => {
            if (typeof key === "function" && key(event as KeyboardEvent)) {
                callback(context, event);
            } else if (typeof key === "string" && (<KeyboardEvent>event).key === key) {
                callback(context, event);
            }
        });
        return this;
    }

    public input(callback: ComponentEventCallback): this {
        this.event("input", callback);
        return this;
    }

    public value(value: string): this {
        this.attribute("value", value);
        return this;
    }

    public readonly(value: boolean): this {
        this.attribute("readonly", value ? "true" : "false");
        return this;
    }

    public required(value: boolean): this {
        this.attribute("required", value ? "true" : "false");
        return this;
    }

    public pattern(value: string): this {
        this.attribute("pattern", value);
        return this;
    }

    public minLength(value: number): this {
        this.attribute("minlength", value.toString());
        return this;
    }

    public maxLength(value: number): this {
        this.attribute("maxlength", value.toString());
        return this;
    }

    public size(value: number): this {
        this.attribute("size", value.toString());
        return this;
    }

    public clear(): this {
        (this.getElement() as HTMLInputElement).value = "";
        return this;
    }
}