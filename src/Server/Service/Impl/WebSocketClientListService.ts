namespace Estella.Core.Server {

    export class WebSocketClientListService implements IWebSocketClientListService {

        private webSocketClientList: Map<number, IWebSocketClient>;
        private lastSocketClientId: number;

        constructor() {
            this.lastSocketClientId = 0;
            this.webSocketClientList = new Map<number, IWebSocketClient>();
        }

        public remove(client: IWebSocketClient): void {
            this.webSocketClientList.delete(client.getId());
        }

        public add(client: any): IWebSocketClient {
            let newClientId = this.getNewClientId();
            let webSocketClient = new WebSocketClient(newClientId, client);
            this.webSocketClientList.set(newClientId, webSocketClient);
            return webSocketClient;
        }

        public getIterator(): IterableIterator<IWebSocketClient> {
            return this.webSocketClientList.values();
        }

        protected getNewClientId(): number {
            this.lastSocketClientId += 1;
            return this.lastSocketClientId;
        }

        public close() {

        }
    }
}