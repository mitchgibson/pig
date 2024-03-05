import { v4 } from "uuid";
import { RenderEngineProvider } from "./dependency-injection/RenderEngineProvider";
import { Observable, Subscription } from "rxjs";

export type ComponentEventCallback = (context: Component, event: Event) => any;

type ComponentEvent = {
  event: keyof HTMLElementEventMap;
  callback: ComponentEventCallback;
  handler: (event: Event) => any;
};

export class Component {
  private _tagName: string;
  private _renderEngine = RenderEngineProvider();
  private _element: HTMLElement;
  private _id: string = v4();
  private _events: ComponentEvent[] = [];
  private _attributes: Map<string, string> = new Map();
  private _content: string = "";
  private _children: Component[] = [];
  private _styles: Map<string, string> = new Map();
  private _cssClasses: string[] = [];
  private _disabled: boolean = false;

  private _subscriptions: Subscription[] = [];

  constructor(tagName?: string) {
    this._tagName = tagName || this.pascalToKebabCase(this.constructor.name);
    this._element = document.createElement(this._tagName);
  }

  public init(): void {}

  public destroy(): void {
    this._children.forEach((child) => child.destroy());
    this._subscriptions.forEach((s) => s.unsubscribe());
  }

  public render(): HTMLElement {
    return this._renderEngine(this);
  }

  public reaction<T = any>(observe: Observable<T>, handler: (result: T) => void): void {
    this._subscriptions.push(observe.subscribe(handler));
  }

  protected getStylesKey(): string {
    return this.constructor.name;
  }

  public getId(): string {
    return this._id;
  }

  public getTagName(): string {
    return this._tagName;
  }

  public getElement(): HTMLElement {
    return this._element;
  }

  public event(event: keyof HTMLElementEventMap, callback: ComponentEventCallback): this {
    const handler = (event: Event) => {
      callback(this, event);
    };
    this._events.push({ event, callback, handler });
    if (!this._disabled) this._element.addEventListener(event, handler);
    return this;
  }

  public removeEvent(name: string, callback: ComponentEventCallback): this {
    const event = this._events.find((e) => e.event === name && e.callback === callback);
    if (event) {
      this._element.removeEventListener(name, event.handler);
      this._events = this._events.filter((e) => e !== event);
    }
    return this;
  }

  public getEvents(): ComponentEvent[] {
    return this._events;
  }

  public attribute(name: string, value: string): this {
    this._attributes.set(name, value);
    this._element.setAttribute(name, value);
    return this;
  }

  public removeAttribute(name: string): this {
    this._attributes.delete(name);
    this._element.removeAttribute(name);
    return this;
  }

  public getAttributes(): Map<string, string> {
    return this._attributes;
  }

  public getAttributeValue(name: string): string {
    return this._attributes.get(name) || "";
  }

  public appendToAttribute(name: string, value: string): this {
    this.attribute(name, `${this.getAttributeValue(name)} ${value}`);
    return this;
  }

  public clearStyles(): this {
    this._styles.clear();
    this._element.removeAttribute("style");
    return this;
  }

  public style(name: string, value: string): this {
    this._styles.set(name, value);
    this._element.style.setProperty(name, value);
    return this;
  }

  public removeStyle(name: string): this {
    this._styles.delete(name);
    this._element.style.removeProperty(name);
    return this;
  }

  public getStyleValue(name: string): string {
    return this._styles.get(name) || "";
  }

  protected applyLocalCssClasses(): this {
    this.cssClass(this._cssClasses);
    return this;
  }

  public clearCssClasses(): this {
    this._element.className = "";
    return this;
  }

  public cssClass(value: string[]): this {
    this._cssClasses.push(...value);
    this._element.classList.add(...value);
    return this;
  }

  public removeCssClass(value: string): this {
    this._cssClasses = this._cssClasses.filter((c) => c !== value);
    this._element.classList.remove(value);
    return this;
  }

  public getCssClasses(): string[] {
    return this._cssClasses;
  }

  public hasClass(value: string): boolean {
    return this._cssClasses.includes(value);
  }

  public content(value: string): this {
    this._content = value;
    this._element.innerHTML = value;
    return this;
  }

  public getContent(): string {
    return this._content;
  }

  public children(children: Component[]): this {
    this.getChildren().forEach((child) => this.removeChild(child));
    this._children = children;
    const elements = this._children.map((child) => {
      child.init();
      return child.render();
    });
    this._element.innerHTML = "";
    this._element.append(...elements);
    return this;
  }

  public replaceChildren(children: Component[]): this {
    this.clearChildren();
    this.children(children);
    return this;
  }

  public insertChild(child: Component, index: number = this.getChildren().length): this {
    this._children.splice(index, 0, child);
    child.init();
    this._element.insertBefore(child.render(), this._element.children[index]);
    return this;
  }

  public slotChild(child: Component, slot: string): this {
    const slotComponent = this.findComponentByAttribute("slot", slot);
    if (!slotComponent) throw new Error(`Slot ${slot} not found in component ${this.constructor.name}`);
    slotComponent.clearChildren();
    slotComponent.insertChild(child);
    return this;
  }

  public removeChild(child: Component): this {
    const index = this._children.indexOf(child);
    if (index === -1) return this;
    child.destroy();
    this._children.splice(index, 1);
    this._element.removeChild(this._element.children[index]);
    return this;
  }

  public clearChildren(): this {
    this._children.forEach((child) => {
      child.destroy();
      this._element.removeChild(child.render());
    });
    this._children = [];
    return this;
  }

  public getChildren(): Component[] {
    return this._children;
  }

  public disable(): this {
    this._disabled = true;
    this.attribute("disabled", "true");
    this.removeAllElementEvents();
    return this;
  }

  public enable(): this {
    this._disabled = false;
    this.removeAttribute("disabled");
    this.removeAllElementEvents();
    this._events.forEach((e) => {
      this.event(e.event, e.callback);
    });
    return this;
  }

  public width(value: string): this {
    this.style("width", value);
    return this;
  }

  public height(value: string): this {
    this.style("height", value);
    return this;
  }

  public getElementHeight(): number {
    return this._element.clientHeight;
  }

  public hide(): this {
    this.getElement().style.display = "none";
    return this;
  }

  private removeAllElementEvents(): void {
    this._events.forEach((e) => {
      this._element.removeEventListener(e.event, e.handler);
    });
  }

  private pascalToKebabCase(str: string): string {
    str = str.charAt(0).toLowerCase() + str.slice(1);
    return str.replace(/([a-z0-9]|(?=[A-Z]))([A-Z])/g, "$1-$2").toLowerCase();
  }

  public findComponentByAttribute(attribute: string, value: string): Component | undefined {
    if (this.getAttributeValue(attribute) === value) return this;
    for (const child of this.getChildren()) {
      const found = child.findComponentByAttribute(attribute, value);
      if (found) return found;
    }
    return undefined;
  }
}
