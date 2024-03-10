import { Subject } from "rxjs";
import { TextInput } from "../form";
import { Component } from "../../core";
import { SearchResults } from "./SearchResults.component";

export type SearchProps = {
  placeholder?: string;
};

export class Search extends Component {
  private results: SearchResults = new SearchResults();

  private input: TextInput = new TextInput()
    .style("width", "100%")
    .input((context, event) => {
      this._valueSubject.next((<any>event.target)?.value);
    })
    .keypress("Enter", () => {
      this._enterSubject.next(true);
    });

  private _valueSubject: Subject<string> = new Subject();
  private _enterSubject: Subject<boolean> = new Subject();

  public valueChanged$ = this._valueSubject.asObservable();
  public enterKeypress$ = this._enterSubject.asObservable();

  constructor(props: SearchProps = {}) {
    super("div");
    this.style("position", "relative");
    this.input.placeholder(props.placeholder || "Search");
    this.children([this.input]);
    this.results.event("click", () => this.removeChild(this.results));
  }

  public inputComponent(): TextInput {
    return this.input;
  }

  public resultsComponent(): SearchResults {
    return this.results;
  }

  public setResults(results: Component[]): void {
    this.results.items(results);
    if (results.length > 0) {
      this.results.style("top", `${this.getElementHeight() + 4}px`);
      this.results.style("left", "0");
      this.insertChild(this.results);
    } else {
      this.removeChild(this.results);
    }
  }

  public clearResults(): void {
    this.results.clearChildren();
    this.removeChild(this.results);
  }
}
