
export class HttpRequestOptions {
    private _options: RequestInit;
  
    constructor(options: RequestInit = {}) {
      this._options = options;
    }
  
    public getHeaders(): HeadersInit | undefined {
      return this._options.headers;
    }
  
    public headers(headers?: HeadersInit): HttpRequestOptions {
      this._options.headers = headers;
      return this;
    }
  
    public getBody(): BodyInit | null | undefined {
      return this._options.body;
    }
  
    public body(body?: BodyInit | null): HttpRequestOptions {
      this._options.body = body;
      return this;
    }
  
    public get(): HttpRequestOptions {
      this._options.method = "GET";
      return this;
    }
  
    public post(): HttpRequestOptions {
      this._options.method = "POST";
      return this;
    }
  
    public put(): HttpRequestOptions {
      this._options.method = "PUT";
      return this;
    }
  
    public patch(): HttpRequestOptions {
      this._options.method = "PATCH";
      return this;
    }
  
    public delete(): HttpRequestOptions {
      this._options.method = "DELETE";
      return this;
    }
  
    public getOptions(): RequestInit {
      return this._options;
    }
  
    public options(options: RequestInit): HttpRequestOptions {
      this._options = options;
      return this;
    }
  }
  