import { Constructor } from "../types/Constructor.type";
import { InjectionToken } from "./InjectionToken.type";

export class Provider<T> {
  private readonly _token: InjectionToken;
  private _value: T | undefined;
  private readonly _factory: () => T;

  get token(): InjectionToken {
    return this._token;
  }

  constructor(token: InjectionToken, factory: () => T) {
    this._token = token;
    this._factory = factory;
  }

  public get value(): T {
    return this._value || this.build();
  }

  private build(): T {
    this._value = this._factory();
    return this._value;
  }
}

export function createProviderFromClass<T>(prototype: Constructor | Array<Constructor | any>): Provider<T> {
  if (!Array.isArray(prototype)) {
    prototype = [prototype];
  }
  prototype = [...prototype];
  const constructor = (prototype.splice(0, 1))[0] as Constructor;
  const args = prototype;

  const symbol = Symbol(constructor.name);
  Object.defineProperty(constructor, "meta_token", { value: symbol });
  return new Provider(symbol, () => new constructor(...args));
}
