import { EntityStruct } from "./Entity.struct";

export abstract class Entity<T extends EntityStruct> {

    public hydrate(struct: Partial<T>): this {
        Object.assign(this, struct);
        return this;
    }
}