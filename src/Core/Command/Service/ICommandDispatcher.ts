namespace Estella.Core {

    export interface ICommandDispatcher extends EntityDispatcher<ICommand, ICommandHandler> {
        process(command: ICommand): void;
    }
}