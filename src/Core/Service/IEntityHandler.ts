namespace Estella.Core {

    export interface IEntityHandler<T extends IEntity> {
        process(entity: T, ...args): void;
        isValid(entity: T, ...args): boolean;
    }
}