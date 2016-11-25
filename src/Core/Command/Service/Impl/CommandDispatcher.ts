/// <reference path="../../../Service/Impl/EntityDispatcher.ts" />

namespace Estella.Core {

    export class CommandDispatcher extends EntityDispatcher<ICommand, ICommandHandler> implements ICommandDispatcher {

    }
}