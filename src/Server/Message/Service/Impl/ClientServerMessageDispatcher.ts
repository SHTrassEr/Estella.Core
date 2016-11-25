namespace Estella.Core.Server {

    export class ClientServerMessageDispatcher extends EntityDispatcher<IClientServerMessage, IClientServerMessageHandler> implements IClientServerMessageDispatcher {
        
        protected clientServerMessageFactory: IEntityFactory;

        public processEvent(ev: IEventWebSocketServer<IEventWebSocketClient<any>>): void {
            let server = ev.getSource();
            let client = ev.getData().getSource();
            let data = ev.getData().getData();
            let message = this.clientServerMessageFactory.restore<IClientServerMessage>(data, ClientServerMessage);
            this.process(message, client, server);
        }


        constructor(clientServerMessageFactory: IEntityFactory) {
            super();
            this.clientServerMessageFactory = clientServerMessageFactory;
        }
    }
}