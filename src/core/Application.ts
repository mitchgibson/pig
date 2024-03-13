import { Component } from "./Component";
import { InjectionToken } from "./dependency-injection/InjectionToken.type";
import { Provider, createProviderFromClass } from "./dependency-injection/Provider";
import { ModuleConstructor } from "./types/ModuleConstructor.type";
import { ProviderSet } from "./types/ProviderSet.type";
import { RootModule } from "./modules/root/Root.module";
import { ModuleSet } from "./types/ModuleSet.type";
import { APPLICATION_TOKEN } from "./dependency-injection/ApplicationToken.constant";
import { Inject } from "./dependency-injection/Inject";
import { RootState } from "./modules/root/Root.state";
import { EnvModule } from "./modules/env/Env.module";
import { BackdropModule } from "./modules/backdrop";
import { EnvService } from "./modules";

export class Application {
  public renderEngine: (component: Component) => any = (component: Component) => {
    const element = component.getElement();
    element.setAttribute("__component-instance-id__", component.getId());
    element.setAttribute("__component-type__", component.constructor.name);
    return element;
  };

  public findComponentByAttribute(attribute: string, value: string): Component | undefined {
    const root = this._rootComponent;
    if (!root) {
      throw new Error("Root component not found.");
    }
    return root.findComponentByAttribute(attribute, value);
  }

  private _providers: Map<InjectionToken, Provider<any>> = new Map();
  private _rootComponent: Component | null = null;

  constructor(private _rootPrototype: typeof Component) {
    const root = globalThis as any;
    root[APPLICATION_TOKEN] = this;
    this.modules([RootModule, EnvModule, BackdropModule]);
  }

  public getProvidedValue<T>(token: InjectionToken): T {
    const tokenValue = Object.getOwnPropertyDescriptor(token, "meta_token");
    if (!tokenValue) throw new Error(`Token ${token.toString()} is not a valid token.`);

    const provider = this._providers.get(tokenValue.value);
    if (!provider) {
      throw new Error(`Provider with token ${token.toString()} not found.`);
    }
    return provider.value as T;
  }

  public modules(modules: ModuleSet): this {
    modules.forEach((module) => {
      if (!Array.isArray(module)) {
        module = [module];
      }
      module = [...module];
      const constructor = module.splice(0, 1)[0] as ModuleConstructor;
      const args = module;
      new constructor(this, ...args);
    });

    return this;
  }

  public provide(prototypes: ProviderSet): this {
    prototypes.forEach((prototype) => {
      try {
        const provider = createProviderFromClass(prototype);
        if (this._providers.has(provider.token)) {
          throw new Error(`Provider with token ${provider.token.toString()} already exists.`);
        }
        this._providers.set(provider.token, provider);
      } catch (error) {
        console.error("Error while registering provider.", error);
      }
    });

    return this;
  }

  public env(config: Record<string, any>): void {
    const envService: EnvService = this.getProvidedValue(EnvService);
    envService.initialize(config);
  }

  public setRenderer(renderEngine: (element: Component) => any): void {
    this.renderEngine = renderEngine;
  }

  public bootstrap(selector: string): void {
    this._rootComponent = new this._rootPrototype();
    Inject<RootState>(RootState).mutate(this._rootComponent);

    const element = document.querySelector(selector);
    if (!element) {
      throw new Error(`Element with selector ${selector} not found.`);
    }
    element.append(this._rootComponent.render());
  }
}
