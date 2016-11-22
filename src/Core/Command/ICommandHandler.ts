namespace Estella.Core {

    export interface ICommandHandler {
        execute(command: ICommand): void;
        isValid(command: ICommand): boolean;
    }

}