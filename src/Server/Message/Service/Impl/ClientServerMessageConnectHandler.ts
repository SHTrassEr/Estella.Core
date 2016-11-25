/// <reference path="ClientServerMessageHandler.ts" />

namespace Estella.Core.Server {

    export class ClientServerMessageConnectHandler extends ClientServerMessageHandler {
    
        protected processEntity(message: ClientServerMessageConnect, client: IWebSocketClient, server: IWebSocketServer) {
            let m = new ClientServerMessageRequestAuthentication();
            //todo: check module version
            client.sendMessage(m)
        }

        protected getEntityType() {
            return ClientServerMessageConnect;
        }
    }
}