import { BehaviorSubject, EMPTY, Observable, catchError, combineLatest, map, switchMap, take } from "rxjs";
import { HttpInterceptors } from "./HttpInterceptors";
import { HttpRequestOptions } from "./HttpRequestOptions";
import { HttpResponseError } from "./HttpClient";
import { fromFetch } from "rxjs/fetch";
import { AsyncObservable, AsyncObservableState } from "../core";

export type HttpFetchOptions = {
  options: HttpRequestOptions;
  interceptors: HttpInterceptors;
  selector: <T>(response: Response) => Observable<T>;
};

export class HttpFetch<T = any> {
  private _url: string;
  private _path: string = "";
  private _httpFetchOptions: HttpFetchOptions;
  private _params: URLSearchParams;
  private _transformer: (data: any) => T = (data: any) => data as T;
  private _beforeSendObservers: ((request: HttpFetch<T>) => HttpFetch<T>)[] = [];

  private _dataSubject: BehaviorSubject<T | undefined> = new BehaviorSubject<T | undefined>(undefined);
  private _loadingSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  private _errorSubject: BehaviorSubject<HttpResponseError | undefined> = new BehaviorSubject<HttpResponseError | undefined>(undefined);

  public data$: Observable<T | undefined> = this._dataSubject.asObservable();
  public loading$: Observable<boolean> = this._loadingSubject.asObservable();
  public error$: Observable<HttpResponseError | undefined> = this._errorSubject.asObservable();

  constructor(url: string, options: HttpFetchOptions, params: URLSearchParams = new URLSearchParams()) {
    this._url = url;
    this._httpFetchOptions = options;
    this._params = params;
  }

  public transform(transformer: (data: any) => T): HttpFetch<T> {
    this._transformer = transformer;
    return this;
  }

  public beforeSend(interceptor: (request: HttpFetch<T>) => HttpFetch<T>): HttpFetch<T> {
    this._beforeSendObservers.push(interceptor);
    return this;
  }

  public params(params: Record<string, string>, merge: boolean = false): HttpFetch<T> {
    this._params = new URLSearchParams();
    if(merge) {
      const mergedParams = Object.assign({}, Object.fromEntries(this._params), params);
      Object.keys(mergedParams).forEach((key) => {
        this._params.set(key, mergedParams[key]);
      });
    } else {
      Object.keys(params).forEach((key) => {
        this._params.set(key, params[key]);
      });
    }
    return this;
  }

  public param(key: string, value: string): HttpFetch<T> {
    this._params.set(key, value);
    return this;
  }

  public path(path: string): HttpFetch<T> {
    this._path = path;
    return this;
  }

  public get(): HttpFetch<T> {
    this._httpFetchOptions.options.get();
    return this;
  }

  public post(): HttpFetch<T> {
    this._httpFetchOptions.options.post();
    return this;
  }

  public put(): HttpFetch<T> {
    this._httpFetchOptions.options.put();
    return this;
  }

  public patch(): HttpFetch<T> {
    this._httpFetchOptions.options.patch();
    return this;
  }

  public delete(): HttpFetch<T> {
    this._httpFetchOptions.options.delete();
    return this;
  }

  public state(): AsyncObservableState<T> {
    return {
      data: this._dataSubject.getValue(),
      loading: this._loadingSubject.getValue(),
      error: this._errorSubject.getValue(),
    };
  }

  public observe(): AsyncObservable<T> {
    return combineLatest([this.data$, this.loading$, this.error$]).pipe(
      switchMap(([data, loading, error]) => {
        return new Observable((observer) => {
          observer.next({
            data,
            loading,
            error,
          });
        });
      })
    ) as AsyncObservable<T>;
  }

  public send(): AsyncObservable<T> {
    this._loadingSubject.next(true);
    this._errorSubject.next(undefined);

    const requestOptions = this._httpFetchOptions.options.getOptions();
    const initialRequest = this.buildRequest(this._url, requestOptions);
    this._httpFetchOptions.interceptors
      .request(initialRequest)
      .pipe(
        take(1),
        switchMap((request: Request) => fromFetch(request)),
        switchMap((response: Response) => this._httpFetchOptions.interceptors.response(response)),
        switchMap((response: Response) => {
          if (!response.ok) {
            throw response;
          }
          return this._httpFetchOptions.selector<T>(response).pipe(map(this._transformer));
        }),
        catchError((error) => {
          this._errorSubject.next({
            status: error.status || 0,
            statusText: error.statusText || "HttpFetch Error",
            message: error.message || error?.status.toString() || "Error in HttpFetch",
          });
          this._loadingSubject.next(false);
          return EMPTY;
        })
      )
      .subscribe((data: T) => {
        this._dataSubject.next(data);
        this._loadingSubject.next(false);
      });

    return this.observe();
  }

  public reset(): void {
    this._dataSubject.next(undefined);
    this._loadingSubject.next(false);
    this._errorSubject.next(undefined);
  }

  private buildRequest(url: string, options: RequestInit): Request {
    const urlWithParams = new URL(url + this._path);
    this._params.forEach((value, key) => {
      urlWithParams.searchParams.set(key, value);
    });
    return new Request(urlWithParams, options);
  }
}
