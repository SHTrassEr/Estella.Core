namespace Estella.Core.Server {

    export class WebSocketClient implements IWebSocketClient {

        protected id: number;
        protected clientId: number;
        protected status: WebSocketClientStatus;
        protected client: any;
        protected sid: string;

        constructor(id: number, client: WebSocket) {
            this.id = id;
            this.client = client;
            this.setStatus(WebSocketClientStatus.Initialization);
            this.init();
        }

        protected init() {
            this.client.on('message', this.socketMessageHandler.bind(this));
            this.client.on('close', this.socketCloseHandler.bind(this));
        }

        protected socketMessageHandler(ev: any): void {
            if (this.status != WebSocketClientStatus.Disconnected) {
                this.processMessage(JSON.parse(ev));
            }
        }


        protected socketCloseHandler(ev: any): void {
            this.onClientClose.trigger(new EventWebSocketClient(this, ev));
        }

        protected processMessage(attr: Iterable<[number, any]>): void {

            if (attr) {
                this.onClientMessage.trigger(new EventWebSocketClient(this, attr));
            }
        }

        public getId(): number {
            return this.id;
        }

        public getStatus(): WebSocketClientStatus {
            return this.status;
        }

        public setStatus(status: WebSocketClientStatus): void {
            this.status = status;
        }

        public getSID(): string {
            return this.sid;
        }

        public setSID(sid: string): void {
            this.sid = sid;
        }

        public getClientId(): number {
            return this.clientId;
        }

        public setClientId(clientId: number): void {
            this.clientId = clientId;
        }

        public close() {
            this.client.close();
        }

        public sendMessage(attr: IClientServerMessage): void {
            try {
                this.client.send(JSON.stringify(attr.getList()));
            }
            catch (e) {
                console.log(e);
                this.status = WebSocketClientStatus.Disconnected;
            }
        }

        private onClientMessage = new LiteEvent<IEventWebSocketClient<any>>();
        private onClientClose = new LiteEvent<IEventWebSocketClient<any>>();

        public clientMessage(): ILiteEvent<IEventWebSocketClient<any>> {
            return this.onClientMessage;
        }

        public clientClose(): ILiteEvent<IEventWebSocketClient<any>> {
            return this.onClientClose;
        }
    }
}