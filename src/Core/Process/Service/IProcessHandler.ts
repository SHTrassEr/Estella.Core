namespace Estella.Core {

    export interface IProcessHandler {
        init(process: IProcess): void;
        execute(process: IProcess): void;
        finish(process: IProcess): void;
    }
}