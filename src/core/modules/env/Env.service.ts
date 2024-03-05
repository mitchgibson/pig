export class EnvService {
  protected _options: Record<string, any> = {};

  public get(key: keyof Record<string, any>): any {
    return this._options[key];
  }

  public initialize(options: Record<string, any>): void {
    this._options = options;
    Object.freeze(this._options);
  }
}
