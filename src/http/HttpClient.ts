import { HttpInterceptors } from "./HttpInterceptors";
import { Inject } from "../core";
import { HttpFetch, HttpFetchOptions } from "./HttpFetch";
import { HttpRequestOptions } from "./HttpRequestOptions";
import { from } from "rxjs";

export type HttpResponseError = {
  status: number;
  statusText: string;
  message: string;
};

export class HttpClient {
  private _interceptors: HttpInterceptors = Inject(HttpInterceptors);

  public get<T>(url: string, options: RequestInit = {}): HttpFetch<T> {
    const fetchOptions = new HttpRequestOptions(options).get();
    return this.request<T>(url, fetchOptions);
  }
  
  private request<T = any>(url: string, options: HttpRequestOptions): HttpFetch<T> {
    const fetchOptions: HttpFetchOptions = {
      options,
      interceptors: this._interceptors,
      selector: (response: Response) => {
        return from(response.json());
      },
    };

    return new HttpFetch(url, fetchOptions);
  }
}
