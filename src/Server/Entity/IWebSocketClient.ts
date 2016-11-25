namespace Estella.Core.Server {

    export interface IWebSocketClient {

        getId(): number;

        getStatus(): WebSocketClientStatus;
        setStatus(status: WebSocketClientStatus): void;

        getSID(): string;
        setSID(sid: string): void;

        getClientId(): number;
        setClientId(clientId: number): void;

        sendMessage(message: IClientServerMessage);

        close();

        clientMessage(): ILiteEvent<IEventWebSocketClient<any>>;
        clientClose(): ILiteEvent<IEventWebSocketClient<any>>;
    }
}