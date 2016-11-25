namespace Estella.Core {

    export interface IProcessHandler extends IEntityHandler<IProcess>{
        init(process: IProcess): void;
        finish(process: IProcess): void;
    }
}