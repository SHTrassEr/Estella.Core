/// <reference path="ClientServerMessageHandler.ts" />

namespace Estella.Core.Server {

    export class ClientServerMessageResponseAuthenticationHandler extends ClientServerMessageHandler {

        protected processEntity(message: ClientServerMessageResponseAuthentication, client: IWebSocketClient, server: IWebSocketServer) {
            client.setSID(message.getSID());

            let m = new ClientServerMessageRequestAuthentication();
            client.sendMessage(m)
        }

        protected getEntityType() {
            return ClientServerMessageResponseAuthentication;
        }
    }
}