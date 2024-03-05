import { Inject } from "../core";
import { HttpClient } from "./HttpClient";
import { HttpFetch } from "./HttpFetch";

export type HttpFetchFactory<T, U = undefined> = (options: U) => HttpFetch<T>;

export abstract class AbstractHttpFetchFactory<T, U> {
  protected _http: HttpClient = Inject(HttpClient);

  public abstract create(): HttpFetchFactory<T, U>;
}
