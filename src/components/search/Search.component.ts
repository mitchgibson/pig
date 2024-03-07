import { Subject } from "rxjs";
import { TextInput } from "../form";
import { Component } from "../../core";

export type SearchProps = {
  placeholder?: string;
};

export class Search extends Component {
  
  private input: TextInput = new TextInput()
    .cssClass(["w-full"])
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
    this.input.placeholder(props.placeholder || "Search");
    this.children([this.input]);
  }

  public inputComponent(): TextInput {
    return this.input;
  }
}
