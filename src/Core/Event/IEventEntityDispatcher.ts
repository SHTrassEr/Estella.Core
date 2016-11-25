namespace Estella.Core {

    export interface IEventEntityDispatcher<T extends IEntity, H extends IEntityHandler<T>> {
        getSource(): IEntityDispatcher<T, H>;
        getEntity(): T;
        getEntityHandler(): H;
    }
}