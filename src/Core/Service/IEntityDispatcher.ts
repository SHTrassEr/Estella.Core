namespace Estella.Core {

    export interface IEntityDispatcher<T extends IEntity, H extends IEntityHandler<T>> {
        set(t: typeof Entity, handler: H): void
        has(t: typeof Entity): boolean;
        delete(t: typeof Entity): void;

        process(entity: T, ...args): void;
    }
}