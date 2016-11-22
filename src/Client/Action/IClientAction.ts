namespace Estella.Core {

    export interface IClientAction {
        setOnAction(handler: () => void);
        getCommandKeyValuePairList(): [number, any][][];
        clear(): void;
    }
}