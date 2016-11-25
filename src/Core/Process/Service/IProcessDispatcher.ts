namespace Estella.Core {

    export interface IProcessDispatcher extends IEntityDispatcher<IProcess, IProcessHandler> {
        init(process: IProcess): void;
        finish(process: IProcess): void;
    }

}