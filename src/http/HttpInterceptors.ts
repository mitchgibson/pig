import { Observable, from, of, take } from "rxjs";

export type HttpRequestInterceptor = (request: Request) => Observable<Request> | Promise<Request> | Request;
export type HttpResponseInterceptor = (response: Response) => Observable<Response> | Promise<Response> | Response;

export type HttpInterceptorsOptions = {
  requestInterceptors?: HttpRequestInterceptor[];
  responseInterceptors?: HttpResponseInterceptor[];
};

export class HttpInterceptors {
  private requestInterceptors: HttpRequestInterceptor[] = [];
  private responseInterceptors: HttpResponseInterceptor[] = [];

  constructor(options: HttpInterceptorsOptions = {}) {
    this.requestInterceptors = options.requestInterceptors || this.requestInterceptors;
    this.responseInterceptors = options.responseInterceptors || this.responseInterceptors;
  }

  public request(request: Request): Observable<Request> {
    if (this.requestInterceptors.length === 0) return of(request);

    const final = new Observable<Request>((observer) => {
      let currentRequest = request;
      let index = 0;
      const next = (req: Request) => {
        if (index === this.requestInterceptors.length) {
          observer.next(req);
          observer.complete();
          return;
        }
        const interceptor = this.requestInterceptors[index];
        let result = interceptor(req);
        if (result instanceof Promise) {
          result = from(result);
        } else if (!(result instanceof Observable)) {
          result = of(result);
        }

        result.pipe(take(1)).subscribe((req) => {
          currentRequest = req;
          index++;
          next(req);
        });
      };
      next(currentRequest);
    });

    return final;
  }

  public response(response: Response): Observable<Response> {
    if (this.responseInterceptors.length === 0) return of(response);

    const final = new Observable<Response>((observer) => {
      let currentResponse = response;
      let index = 0;
      const next = (res: Response) => {
        if (index === this.responseInterceptors.length) {
          observer.next(res);
          observer.complete();
          return;
        }
        const interceptor = this.responseInterceptors[index];
        let result = interceptor(res);
        if (result instanceof Promise) {
          result = from(result);
        } else if (!(result instanceof Observable)) {
          result = of(result);
        }

        result.pipe(take(1)).subscribe((res) => {
          currentResponse = res;
          index++;
          next(res);
        });
      };
      next(currentResponse);
    });

    return final;
  }
}
