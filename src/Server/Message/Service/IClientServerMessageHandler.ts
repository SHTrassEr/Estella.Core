namespace Estella.Core.Server {

    export interface IClientServerMessageHandler extends IEntityHandler<IClientServerMessage> {
        process(entity: IClientServerMessage, client: IWebSocketClient, server: IWebSocketServer): void;
    }

}