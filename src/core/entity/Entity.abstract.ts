import { EntityStruct } from "./Entity.struct";

export abstract class Entity<T extends EntityStruct> {
    private _data?: T;

    public hydrate(struct: T): this {
        this._data = struct;
        return this;
    }

    public data(): T | undefined {
        return this._data;
    }
}