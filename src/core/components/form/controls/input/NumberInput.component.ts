import { ComponentEventCallback } from "../../../../Component";
import { Input } from "./Input.component";

export class NumberInput extends Input {
    constructor() {
        super("input");
        this.type("number");
    }

    public change(callback: ComponentEventCallback): this {
        this.event("change", callback);
        return this;
    }

    public input(callback: ComponentEventCallback): this {
        this.event("input", callback);
        return this;
    }

    public placeholder(value: string): this {
        this.attribute("placeholder", value);
        return this;
    }

    public min(value: number): this {
        this.attribute("min", value.toString());
        return this;
    }

    public max(value: number): this {
        this.attribute("max", value.toString());
        return this;
    }

    public step(value: number): this {
        this.attribute("step", value.toString());
        return this;
    }

    public value(value: number): this {
        this.attribute("value", value.toString());
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
}