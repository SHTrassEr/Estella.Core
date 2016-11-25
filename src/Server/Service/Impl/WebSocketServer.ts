namespace Estella.Core.Server {

    export class WebSocketServer implements IWebSocketServer {

        private server: any;
        protected webSocketClientList: Map<number, IWebSocketClient>;
        protected clientServerMessageDispatcher: IClientServerMessageDispatcher;

        protected lastSocketClientId: number;

        constructor(server: any) {
            this.lastSocketClientId = 0;
            this.webSocketClientList = new Map<number, IWebSocketClient>();
            this.server = server;
            this.init();
        }

        protected init() {
            this.server.on('connection', this.clientConnectedhandler.bind(this));
        }

        protected clientConnectedhandler(client) {
            let newClientId = this.getNewClientId();
            let webSocketClient = new WebSocketClient(newClientId, client);
            this.webSocketClientList.set(newClientId, webSocketClient);
            this.initWebSocketClient(webSocketClient);
            this.onClientConnected.trigger(new EventWebSocketServer(this, webSocketClient));
        }

        protected initWebSocketClient(webSocketClient: IWebSocketClient) {
            webSocketClient.clientMessage().on(this.clientMessageHandler.bind(this));
        }

        protected clientMessageHandler(ev: IEventWebSocketClient<any>) {
            this.onClientMessage.trigger(new EventWebSocketServer(this, ev));
        }

        protected onClientDisconnected(webSocketClient: IWebSocketClient) {
            this.webSocketClientList.delete(webSocketClient.getId());
            webSocketClient.setStatus(WebSocketClientStatus.Disconnected);
            
        }

        public close() {
            for (let client of this.webSocketClientList.values()) {
                client.close();
            }
        }

        protected getNewClientId(): number {
            this.lastSocketClientId += 1;
            return this.lastSocketClientId;
        }

        private onClientConnected = new LiteEvent<IEventWebSocketServer<IWebSocketClient>>();
        private onClientMessage = new LiteEvent<IEventWebSocketServer<IEventWebSocketClient<any>>>();
        private onClientClose = new LiteEvent<IEventWebSocketServer<IEventWebSocketClient<any>>>();

        public clientConnected(): ILiteEvent<IEventWebSocketServer<IWebSocketClient>> {
            return this.onClientConnected;
        }

        public clientMessage(): ILiteEvent<IEventWebSocketServer<IEventWebSocketClient<any>>> {
            return this.onClientMessage;
        }

        public clientClose(): ILiteEvent<IEventWebSocketServer<IEventWebSocketClient<any>>> {
            return this.onClientClose;
        }
    }
}