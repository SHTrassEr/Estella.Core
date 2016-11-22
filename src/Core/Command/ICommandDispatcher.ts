namespace Estella.Core {

    export interface ICommandDispatcher {
        execute(command: ICommand): void;
    }

}