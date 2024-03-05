import { Observable } from "rxjs";

export type AsyncObservableState<T> = {
    data: T | undefined;
    loading: boolean;
    error: unknown | undefined;
  }

  export type AsyncObservable<T> = Observable<AsyncObservableState<T>>;