declare namespace Estella.Core {
    interface IClient extends IEntity {
        getName(): string;
        setName(name: string): void;
    }
}
declare namespace Estella.Core {
    interface IClientListService extends IEntityListService<IClient> {
    }
}
declare namespace Estella.Core {
    module ModuleInfo {
        const name: string;
    }
}
declare namespace Estella.Core {
    class Entity implements IEntity {
        protected attributeList: IAttributeList;
        protected lastAttributeId: number;
        private _type;
        private _id;
        constructor(attributeList?: IAttributeList, kvpList?: Iterable<[number, any]>);
        getType(): string;
        private setType(type);
        getId(): number;
        setId(id: number): void;
        getList(): [number, any][];
        setList(attributeList: Iterable<[number, any]>, clear?: boolean): void;
        [Symbol.iterator]: any;
        getIterator(): IterableIterator<[number, any]>;
        getAttributeList(): IAttributeList;
    }
    module Entity {
        const type: string;
    }
}
declare namespace Estella.Core {
    class Command extends Entity implements ICommand {
        private _initiatorId;
        getInitiatorId(): number;
        setInitiatorId(id: number): void;
    }
    module Command {
        const type: string;
    }
}
declare namespace Estella.Core {
    class CommandDispatcher implements ICommandDispatcher {
        protected commandHandlerList: Map<string, ICommandHandler>;
        constructor();
        execute(command: ICommand): void;
        protected getHandler(command: ICommand): ICommandHandler;
    }
}
declare namespace Estella.Core {
    class CommandHandler implements ICommandHandler {
        protected world: IWorld;
        constructor(world: IWorld);
        execute(command: ICommand): void;
        isValid(command: ICommand): boolean;
        protected executeCommand(command: ICommand): void;
        protected isValidCommand(command: ICommand): boolean;
        protected isValidCommandType(command: ICommand): boolean;
        protected startProcess(process: IProcess): void;
        protected finishProcess(process: IProcess): void;
    }
}
declare namespace Estella.Core {
    class CommandListService implements ICommandListService {
        protected commandList: ICommand[];
        protected filterService: IFilterService<ICommand>;
        constructor();
        getCommandList(): ICommand[];
        add(command: ICommand): void;
        setCommandList(commandList: Iterable<ICommand>): void;
        getCommandKeyValuePairList(): [number, any][][];
        clear(): void;
        getAll(condition: (item: ICommand) => boolean): IterableIterator<ICommand>;
        getFirst(condition: (item: ICommand) => boolean): ICommand;
    }
}
declare namespace Estella.Core {
    class AttributeListArray implements IAttributeList {
        protected attributeList: any[];
        constructor();
        get(attribute: number, defaultValue?: any): any;
        set(attribute: number, value: any): void;
        clear(): void;
        setList(attributeList: Iterable<[number, any]>, clear?: boolean): void;
        rollback(): void;
        commit(): void;
        isDirty(): boolean;
        [Symbol.iterator]: any;
        getIterator(): IterableIterator<[number, any]>;
        has(attribute: number): boolean;
        delete(attribute: number): void;
        getList(): [number, any][];
    }
}
declare namespace Estella.Core {
    class AttributeListMap implements IAttributeList {
        protected attributeList: Map<number, any>;
        constructor();
        get(attribute: number, defaultValue?: any): any;
        set(attribute: number, value: any): void;
        clear(): void;
        setList(attributeList: Iterable<[number, any]>, clear?: boolean): void;
        rollback(): void;
        commit(): void;
        isDirty(): boolean;
        [Symbol.iterator]: any;
        getIterator(): IterableIterator<[number, any]>;
        has(attribute: number): boolean;
        delete(attribute: number): void;
        getList(): [number, any][];
    }
}
declare namespace Estella.Core {
    class AttributeListMapCommitable implements IAttributeList {
        protected deletedAttributeList: Set<number>;
        protected commitedAttributeList: Map<number, any>;
        protected attributeList: Map<number, any>;
        constructor();
        get(attribute: number, defaultValue?: any): any;
        set(attribute: number, value: any): void;
        clear(): void;
        setList(attributeList: Iterable<[number, any]>, clear?: boolean): void;
        has(attribute: number): boolean;
        rollback(): void;
        commit(): void;
        isDirty(): boolean;
        delete(attribute: number): void;
        [Symbol.iterator]: any;
        getIterator(): IterableIterator<[number, any]>;
        getList(): [number, any][];
    }
}
declare namespace Estella.Core {
    class EventEngine implements IEventEngine {
        protected engine: IEngine;
        protected step: number;
        constructor(engine: IEngine, step: number);
        getSource(): IEngine;
        getStep(): number;
    }
}
declare namespace Estella.Core {
    class EventEntityFactory implements IEventEntityFactory {
        protected entityFactory: IEntityFactory;
        protected entity: IEntity;
        protected type: typeof Entity;
        protected attr: Iterable<[number, any]>;
        constructor(entityFactory: IEntityFactory, entity?: IEntity, type?: typeof Entity, attr?: Iterable<[number, any]>);
        getSource(): IEntityFactory;
        getEntity(): IEntity;
        getType(): typeof Entity;
        getAttr(): Iterable<[number, any]>;
    }
}
declare namespace Estella.Core {
    class EventEntityListService<T extends IEntity> implements IEventEntityListService<T> {
        protected entityListService: IEntityListService<T>;
        protected entity: T;
        constructor(entityListService: IEntityListService<T>, entity?: T);
        getSource(): IEntityListService<T>;
        getEntity(): T;
    }
}
declare namespace Estella.Core {
    class Item extends Entity implements IItem {
    }
    module Item {
        const type: string;
    }
}
declare namespace Estella.Core {
    class ClientServerMessage extends Entity implements IClientServerMessage {
    }
    module ClientServerMessage {
        const type: string;
    }
}
declare namespace Estella.Core {
    class ClientServerMessageCommandList extends ClientServerMessage {
        private _commandList;
        setCommandList(commandList: [number, any][][]): void;
        getCommandList(): [number, any][][];
    }
    module ClientServerMessageCommandList {
        const type: string;
    }
}
declare namespace Estella.Core {
    class ClientServerMessageInit extends ClientServerMessage {
        private _clientId;
        setClientId(clientId: number): void;
        getClientId(): number;
    }
    module ClientServerMessageInit {
        const type: string;
    }
}
declare namespace Estella.Core {
    class ClientServerMessageRequestAuthentication extends ClientServerMessage {
    }
    module ClientServerMessageRequestAuthentication {
        const type: string;
    }
}
declare namespace Estella.Core {
    class ClientServerMessageResponseAuthentication extends ClientServerMessage {
        private _sid;
        setSID(sid: string): void;
        getSID(): string;
    }
    module ClientServerMessageResponseAuthentication {
        const type: string;
    }
}
declare namespace Estella.Core {
    class ClientServerMessageStep extends ClientServerMessage {
        private _commandList;
        private _stepNumber;
        setCommandList(commandList: ICommand[]): void;
        getCommandList(): [number, any][][];
        getStepNumber(): number;
        setStepNumber(stepNumber: number): void;
    }
    module ClientServerMessageStep {
        const type: string;
    }
}
declare namespace Estella.Core {
    class ClientServerMessageStepList extends ClientServerMessage {
        private _stepList;
        setStepList(stepList: IEntity[]): void;
        getStepList(): [number, any][][];
    }
    module ClientServerMessageStepList {
        const type: string;
    }
}
declare namespace Estella.Core {
    class ClientServerMessageWorldFullInfo extends ClientServerMessage {
        private _worldAttributeList;
        private _clientListService;
        private _itemListService;
        private _processListService;
        setWorld(world: IWorld): void;
        setWorldAttributeList(worldAttributeList: IWorldAttributeList): void;
        getWorldAttributeList(): [number, any][];
        setClientListService(clientListService: IClientListService): void;
        getClientListService(): [number, any][][];
        setItemListService(itemListService: IItemListService): void;
        getItemListService(): [number, any][][];
        setProcessListService(processListService: IProcessListService): void;
        getProcessListService(): [number, any][][];
    }
    module ClientServerMessageWorldFullInfo {
        const type: string;
    }
}
declare namespace Estella.Core {
    interface IProcess extends IEntity {
        getInitStep(): number;
        setInitStep(initStep: number): void;
        getFinishStep(): number;
        setFinishStep(finishStep: number): void;
        getStatus(): ProcessStatus;
        setStatus(processStatus: ProcessStatus): void;
        getAttributeList(): IAttributeList;
    }
}
declare namespace Estella.Core {
    interface IProcessDispatcher {
        init(process: IProcess): void;
        execute(process: IProcess): void;
        finish(process: IProcess): void;
    }
}
declare namespace Estella.Core {
    interface IProcessHandler {
        init(process: IProcess): void;
        execute(process: IProcess): void;
        finish(process: IProcess): void;
    }
}
declare namespace Estella.Core {
    interface IProcessListService extends IFilterable<IProcess> {
        init(objectList: Iterable<Iterable<[number, any]>>): void;
        getProcessList(): IProcess[];
        add(process: IProcess): void;
        removeFinished(): void;
        clear(): void;
        getIterator(): IterableIterator<IProcess>;
        getList(): [number, any][][];
        setList(object: Iterable<IProcess>, clear?: boolean): void;
    }
}
declare namespace Estella.Core {
    class Engine implements IEngine {
        protected world: IWorld;
        protected processListService: IProcessListService;
        protected processDispatcher: IProcessDispatcher;
        protected commandDispatcher: ICommandDispatcher;
        protected commandListService: ICommandListService;
        private onBeforeUpdate;
        private onAfterUpdate;
        constructor(world: IWorld, commandListService: ICommandListService);
        getWorld(): IWorld;
        getCommandListService(): ICommandListService;
        update(): void;
        getStep(): number;
        protected increaseStepNumber(): void;
        getCommandList(): ICommand[];
        protected processCommandList(): void;
        protected triggerEvent(event: LiteEvent<IEventEngine>, step: number): void;
        beforeUpdate(): ILiteEvent<IEventEngine>;
        afterUpdate(): ILiteEvent<IEventEngine>;
    }
}
declare namespace Estella.Core {
    class EntityFactory implements IEntityFactory {
        private initEntityHandler;
        protected itemAttributeType: number;
        protected entityList: Map<string, typeof Entity>;
        constructor(initEntityHandler?: (entity: IEntity, t?: typeof Entity, attr?: Iterable<[number, any]>) => void);
        set(t: typeof Entity): void;
        has(t: typeof Entity | string): boolean;
        delete(t: typeof Entity | string): void;
        protected getType(t: typeof Entity | string): string;
        protected getItemType(attr: Iterable<[number, any]>): string;
        restoreList<T extends IEntity>(attrList: Iterable<Iterable<[number, any]>>, baseClass: typeof Entity): Iterable<T>;
        protected createByType(type: string, attr?: Iterable<[number, any]>): IEntity;
        restore<T extends IEntity>(attr: Iterable<[number, any]>, t: typeof Entity): T;
        create<T extends IEntity>(t: typeof Entity): T;
        protected createByAttr(attr: Iterable<[number, any]>): IEntity;
        protected initEntity(entity: IEntity, t?: typeof Entity, attr?: Iterable<[number, any]>): void;
        protected createAttributeList(type: string): IAttributeList;
        private onBeforeCreate;
        private onAfterCreate;
        private onBeforeRestore;
        private onAfterRestore;
        private onBeforeInit;
        private onAfterInit;
        protected triggerEvent(event: LiteEvent<IEventEntityFactory>, entity?: IEntity, type?: typeof Entity, attr?: Iterable<[number, any]>): void;
        beforeCreate(): ILiteEvent<IEventEntityFactory>;
        afterCreate(): ILiteEvent<IEventEntityFactory>;
        beforeRestore(): ILiteEvent<IEventEntityFactory>;
        afterRestore(): ILiteEvent<IEventEntityFactory>;
        beforeInit(): ILiteEvent<IEventEntityFactory>;
        afterInit(): ILiteEvent<IEventEntityFactory>;
    }
}
declare namespace Estella.Core {
    class EntityListService<T extends IEntity> implements IEntityListService<T> {
        protected itemList: Map<number, T>;
        protected filterService: IFilterService<T>;
        constructor();
        init(itemList: Iterable<T>): void;
        get(itemId: number): T;
        getSize(): number;
        add(item: T): void;
        has(id: number): boolean;
        remove(id: number): void;
        clear(): void;
        getIterator(): IterableIterator<T>;
        serialize(): [number, any][][];
        setList(entityList: Iterable<T>, clear?: boolean): void;
        getAll(condition: (item: IEntity) => boolean): IterableIterator<T>;
        getFirst(condition: (item: IEntity) => boolean): T;
        getTyped<V extends T>(itemId: number, type: any): V;
        private onBeforeAdd;
        private onAfterAdd;
        private onBeforeRemove;
        private onAfterRemove;
        private onBeforeClear;
        private onAfterClear;
        protected triggerEvent(event: LiteEvent<IEventEntityListService<T>>, item?: T): void;
        beforeAdd(): ILiteEvent<IEventEntityListService<T>>;
        afterAdd(): ILiteEvent<IEventEntityListService<T>>;
        beforeRemove(): ILiteEvent<IEventEntityListService<T>>;
        afterRemove(): ILiteEvent<IEventEntityListService<T>>;
        beforeClear(): ILiteEvent<IEventEntityListService<T>>;
        afterClear(): ILiteEvent<IEventEntityListService<T>>;
    }
}
declare namespace Estella.Core {
    class EntityListServiceCommitable<T extends IEntity> {
        protected itemListService: IEntityListService<T>;
        protected deletedItemIdList: Set<number>;
        protected newItemIdList: Set<number>;
        protected filterService: IFilterService<T>;
        private onBeforeAdd;
        private onBeforeRemove;
        constructor();
        init(itemList: Iterable<T>): void;
        get(id: number): T;
        has(id: number): boolean;
        getSize(): number;
        add(item: T): void;
        protected isItemNotDeleted(item: T): boolean;
        getIterator(): IterableIterator<T>;
        serialize(): [number, any][][];
        setList(entityList: Iterable<T>, clear?: boolean): void;
        remove(id: number): void;
        clear(): void;
        commit(): void;
        rollback(): void;
        isDirty(): boolean;
        getAll(condition: (item: T) => boolean): IterableIterator<T>;
        getFirst(condition: (item: T) => boolean): T;
        getTyped<V extends T>(itemId: number, type: any): V;
        beforeAdd(): ILiteEvent<T>;
        beforeRemove(): ILiteEvent<T>;
    }
}
declare namespace Estella.Core {
    class FilterService<T> implements IFilterService<T> {
        getAll(itemList: Iterable<T>, condition: (item: T) => boolean): IterableIterator<T>;
        getFirst(itemList: Iterable<T>, condition: (item: T) => boolean): T;
    }
}
declare namespace Estella.Core {
    class GameServer implements IGameServer {
        protected emptyCommandList: ICommand[];
        protected engine: IEngine;
        protected metronome: IMetronome;
        protected commandLog: ICommand[][];
        protected timerId: any;
        protected onUpdateWorld: (world: IWorld, currentStepNumber: number, commandList: ICommand[]) => void;
        constructor(engine: IEngine);
        start(): void;
        getCommandLog(startStepNumber: number): ICommand[][];
        protected updateWorld(): void;
        protected getStepNumber(): number;
        setOnUpdateWorld(handler: (world: IWorld, currentStepNumber: number, commandList: ICommand[]) => void): void;
    }
}
declare namespace Estella.Core {
    class LiteEvent<V> implements ILiteEvent<V> {
        private handlers;
        getCount(): number;
        on(handler: {
            (data?: V): void;
        }): void;
        off(handler: {
            (data?: V): void;
        }): void;
        trigger(data?: V): void;
    }
}
declare namespace Estella.Core {
    class Metronome implements IMetronome {
        protected tickLength: number;
        protected startTime: number;
        protected pauseStart: number;
        protected pauseLength: number;
        protected isPaused: boolean;
        constructor(tickLength: number);
        start(startTime?: number): void;
        getStartTime(): number;
        pause(): void;
        resume(): void;
        getTickLength(): number;
        getTickCount(): number;
    }
}
declare namespace Estella.Core {
    abstract class World implements IWorld {
        protected worldAttributeList: IWorldAttributeList;
        protected itemListService: IItemListService;
        protected processListService: IProcessListService;
        protected clientListService: IClientListService;
        protected entityFactory: IEntityFactory;
        protected processDispatcher: IProcessDispatcher;
        protected commandDispatcher: ICommandDispatcher;
        constructor(worldAttributeList: WorldAttributeList);
        protected initEntityFactory(entityFactory: IEntityFactory): void;
        getWorldAttributeList(): IWorldAttributeList;
        getProcessDispatcher(): IProcessDispatcher;
        getCommandDispatcher(): ICommandDispatcher;
        getItemListService(): IItemListService;
        getProcessListService(): IProcessListService;
        getClientListService(): IClientListService;
        getEntityFactory(): IEntityFactory;
        protected getItemId(): number;
        protected getProcessId(): number;
    }
}
declare namespace Estella.Core {
    class WorldAttributeList extends Entity implements IWorldAttributeList {
        private _tickLength;
        private _processId;
        private _lastObjectId;
        private _stepNumber;
        getTickLength(): number;
        setTickLength(tickLength: number): void;
        getLastProcessId(): number;
        setLastProcessId(id: number): void;
        getLastItemId(): number;
        setLastItemId(id: number): void;
        getStepNumber(): number;
        setStepNumber(stepNumber: number): void;
    }
    module WorldAttributeList {
        let LastTypeId: number;
        const Type: number;
    }
}
declare namespace Estella.Core {
    class Client extends Entity implements IClient {
        protected attributeList: IAttributeList;
        protected attributeNameId: number;
        getName(): string;
        setName(name: string): void;
    }
    module Client {
        const type: string;
    }
}
declare namespace Estella.Core {
    class Process extends Entity implements IProcess {
        private _processStatus;
        private _initStep;
        private _finishStep;
        getStatus(): ProcessStatus;
        setStatus(processStatus: ProcessStatus): void;
        getInitStep(): number;
        setInitStep(initStep: number): void;
        getFinishStep(): number;
        setFinishStep(finishStep: number): void;
    }
    module Process {
        const type: string;
    }
}
declare namespace Estella.Core {
    class ProcessDispatcher implements IProcessDispatcher {
        protected processHandlerList: Map<string, IProcessHandler>;
        execute(process: IProcess): void;
        init(process: IProcess): void;
        finish(process: IProcess): void;
        protected getHandler(process: IProcess): IProcessHandler;
    }
}
declare namespace Estella.Core {
    class ProcessHandler implements IProcessHandler {
        protected world: IWorld;
        constructor(world: IWorld);
        init(process: IProcess): void;
        execute(process: IProcess): void;
        finish(process: IProcess): void;
        protected setInitStep(process: IProcess): void;
        protected setFinishStep(process: IProcess): void;
        protected initProcess(process: IProcess): void;
        protected executeProcess(process: IProcess): void;
        protected finishProcess(process: IProcess): void;
        protected isValidProcessType(command: IProcess): boolean;
        protected startProcess(process: IProcess): void;
    }
}
declare namespace Estella.Core {
    class ProcessListService implements IProcessListService {
        protected processList: IProcess[];
        protected filterService: IFilterService<IProcess>;
        constructor();
        init(processList: Iterable<IProcess>): void;
        getProcessList(): IProcess[];
        add(process: IProcess): void;
        removeFinished(): void;
        clear(): void;
        getIterator(): IterableIterator<IProcess>;
        getList(): [number, any][][];
        setList(entityList: Iterable<IProcess>, clear?: boolean): void;
        getAll(condition: (item: IProcess) => boolean): IterableIterator<IProcess>;
        getFirst(condition: (item: IProcess) => boolean): IProcess;
    }
}
declare namespace Estella.Core {
    class ProcessListServiceCommitable implements IProcessListService, ICommitable {
        protected processList: IProcess[];
        protected filterService: IFilterService<IProcess>;
        protected firstUncommitedIndex: number;
        constructor();
        getProcessList(): IProcess[];
        add(process: IProcess): void;
        init(processList: Iterable<IProcess>): void;
        removeFinished(): void;
        clear(): void;
        getIterator(): IterableIterator<IProcess>;
        getList(): [number, any][][];
        setList(processList: Iterable<IProcess>, clear?: boolean): void;
        commit(): void;
        rollback(): void;
        isDirty(): boolean;
        getAll(condition: (item: IProcess) => boolean): IterableIterator<IProcess>;
        getFirst(condition: (item: IProcess) => boolean): IProcess;
    }
}
declare namespace Estella.Core {
    interface ICommand extends IEntity {
        getInitiatorId(): number;
        setInitiatorId(id: number): void;
    }
}
declare namespace Estella.Core {
    interface ICommandDispatcher {
        execute(command: ICommand): void;
    }
}
declare namespace Estella.Core {
    interface ICommandHandler {
        execute(command: ICommand): void;
        isValid(command: ICommand): boolean;
    }
}
declare namespace Estella.Core {
    interface ICommandListService extends IFilterable<ICommand> {
        getCommandList(): ICommand[];
        add(commahd: ICommand): void;
        setCommandList(commandList: Iterable<ICommand>): void;
        getCommandKeyValuePairList(): [number, any][][];
        clear(): void;
    }
}
declare namespace Estella.Core {
    interface IAttributeList extends IterableKeyValuePair, ICommitable {
        get(attribute: number, defaultValue?: any): any;
        set(attribute: number, value: any): void;
        clear(): void;
        setList(attributeList: Iterable<[number, any]>, clear?: boolean): void;
        has(attribute: number): boolean;
        delete(attribute: number): void;
    }
}
declare namespace Estella.Core {
    interface IEntity extends IterableKeyValuePair {
        getType(): string;
        getId(): number;
        setId(id: number): void;
        getAttributeList(): IAttributeList;
        setList(attributeList: Iterable<[number, any]>, clear?: boolean): void;
    }
}
declare namespace Estella.Core {
    interface IFilterable<T> {
        getAll(condition: (item: T) => boolean): IterableIterator<T>;
        getFirst(condition: (item: T) => boolean): T;
    }
}
declare namespace Estella.Core {
    interface IterableKeyValuePair extends Iterable<[number, any]> {
        getList(): [number, any][];
        getIterator(): IterableIterator<[number, any]>;
    }
}
declare namespace Estella.Core {
    interface IEventEngine {
        getSource(): IEngine;
        getStep(): number;
    }
}
declare namespace Estella.Core {
    interface IEventEntityFactory {
        getSource(): IEntityFactory;
        getEntity(): IEntity;
        getType(): typeof Entity;
        getAttr(): Iterable<[number, any]>;
    }
}
declare namespace Estella.Core {
    interface IEventEntityListService<T extends IEntity> {
        getSource(): IEntityListService<T>;
        getEntity(): T;
    }
}
declare namespace Estella.Core {
    class BaseException {
        private message;
        constructor(message?: string);
        getMessage(): string;
    }
}
declare namespace Estella.Core {
    class NotImplementedException {
    }
}
declare namespace Estella.Core {
    interface IItem extends IEntity {
    }
}
declare namespace Estella.Core {
    interface IItemListService extends IEntityListService<IItem> {
    }
}
declare namespace Estella.Core {
    interface IClientServerMessage extends IEntity {
    }
}
declare namespace Estella.Core {
    enum ProcessStatus {
        Unknown = 0,
        Init = 1,
        Executing = 2,
        Finished = 3,
    }
}
declare namespace Estella.Core {
    enum ProcessType {
        Unknown = 0,
    }
}
declare namespace Estella.Core {
    interface ICommitable {
        commit(): void;
        rollback(): void;
        isDirty(): boolean;
    }
}
declare namespace Estella.Core {
    interface IEngine {
        getWorld(): IWorld;
        getCommandListService(): ICommandListService;
        getStep(): number;
        update(): void;
        getCommandList(): ICommand[];
        beforeUpdate(): ILiteEvent<IEventEngine>;
        afterUpdate(): ILiteEvent<IEventEngine>;
    }
}
declare namespace Estella.Core {
    interface IEntityFactory {
        set(t: typeof Entity): void;
        has(t: typeof Entity | string): boolean;
        delete(t: typeof Entity | string): void;
        create<T extends IEntity>(e: typeof Entity): T;
        restore<T extends IEntity>(attr: Iterable<[number, any]>, baseClass: typeof Entity): T;
        restoreList<T extends IEntity>(attrList: Iterable<Iterable<[number, any]>>, baseClass: typeof Entity): Iterable<T>;
        beforeCreate(): ILiteEvent<IEventEntityFactory>;
        afterCreate(): ILiteEvent<IEventEntityFactory>;
        beforeRestore(): ILiteEvent<IEventEntityFactory>;
        afterRestore(): ILiteEvent<IEventEntityFactory>;
        beforeInit(): ILiteEvent<IEventEntityFactory>;
        afterInit(): ILiteEvent<IEventEntityFactory>;
    }
}
declare namespace Estella.Core {
    interface IEntityListService<T extends IEntity> extends IFilterable<T> {
        init(objectList: Iterable<T>): void;
        get(id: number): T;
        has(id: number): boolean;
        getSize(): number;
        add(object: T): void;
        remove(id: number): void;
        clear(): void;
        getIterator(): IterableIterator<T>;
        serialize(): [number, any][][];
        setList(object: Iterable<T>, clear?: boolean): void;
        getTyped<V extends T>(objectId: number, type: any): V;
        beforeAdd(): ILiteEvent<IEventEntityListService<T>>;
        afterAdd(): ILiteEvent<IEventEntityListService<T>>;
        beforeRemove(): ILiteEvent<IEventEntityListService<T>>;
        afterRemove(): ILiteEvent<IEventEntityListService<T>>;
        beforeClear(): ILiteEvent<IEventEntityListService<T>>;
        afterClear(): ILiteEvent<IEventEntityListService<T>>;
    }
}
declare namespace Estella.Core {
    interface IFilterService<T> {
        getAll(itemList: Iterable<T>, condition: (item: T) => boolean): IterableIterator<T>;
        getFirst(itemList: Iterable<T>, condition: (item: T) => boolean): T;
    }
}
declare namespace Estella.Core {
    interface IGameServer {
        start(): void;
        getCommandLog(startStepNumber: number): ICommand[][];
        setOnUpdateWorld(handler: (world: IWorld, currentStepNumber: number, commandList: ICommand[]) => void): void;
    }
}
declare namespace Estella.Core {
    interface ILiteEvent<V> {
        on(handler: {
            (data?: V): void;
        }): void;
        off(handler: {
            (data?: V): void;
        }): void;
        getCount(): number;
    }
}
declare namespace Estella.Core {
    interface IMetronome {
        start(startTime?: number): void;
        getStartTime(): number;
        pause(): void;
        resume(): void;
        getTickLength(): number;
        getTickCount(): number;
    }
}
declare namespace Estella.Core {
    class ServiceAttributeType {
        static LastId: string;
    }
}
declare namespace Estella.Core {
    interface IWorld {
        getWorldAttributeList(): IWorldAttributeList;
        getProcessDispatcher(): IProcessDispatcher;
        getCommandDispatcher(): ICommandDispatcher;
        getItemListService(): IItemListService;
        getProcessListService(): IProcessListService;
        getEntityFactory(): IEntityFactory;
        getClientListService(): IClientListService;
    }
}
declare namespace Estella.Core {
    interface IWorldAttributeList extends IEntity {
        getTickLength(): number;
        setTickLength(tickLength: number): void;
        getLastProcessId(): number;
        setLastProcessId(id: number): void;
        getLastItemId(): number;
        setLastItemId(id: number): void;
        getStepNumber(): number;
        setStepNumber(stepNumber: number): void;
    }
}
declare namespace Estella.Core {
    interface IWebSocketClient {
        getId(): number;
        getStatus(): WebSocketClientStatus;
        setStatus(status: WebSocketClientStatus): void;
        getSID(): string;
        setSID(sid: string): void;
        getClientId(): number;
        setClientId(clientId: number): void;
        sendMessage(message: IClientServerMessage): any;
        setOnMessage(handler: (client: IWebSocketClient, message: IClientServerMessage) => void): void;
        setOnClose(handler: (client: IWebSocketClient) => void): void;
        close(): any;
    }
}
declare namespace Estella.Core {
    enum WebSocketClientStatus {
        Initialization = 0,
        Connected = 1,
        Disconnected = 2,
    }
}
declare namespace Estella.Core {
    interface IWebSocketClientListService {
        addWebSocketClient(client: any): IWebSocketClient;
        getWebSocketClientListIterator(): IterableIterator<IWebSocketClient>;
    }
}
declare namespace Estella.Core {
    interface IWebSocketGameServer {
        start(): void;
    }
}
declare namespace Estella.Core {
    interface IWebSocketServer {
        setOnClientConnected(handler: (webSocketClient: IWebSocketClient) => void): void;
        setOnClientDisconnected(handler: (webSocketClient: IWebSocketClient) => void): void;
        setOnClientMessage(handler: (webSocketClient: IWebSocketClient, message: IClientServerMessage) => void): void;
        sendAll(message: IClientServerMessage): void;
    }
}
declare namespace Estella.Core {
    class WebSocketClient implements IWebSocketClient {
        protected id: number;
        protected clientId: number;
        protected status: WebSocketClientStatus;
        protected client: any;
        protected sid: string;
        protected onMessageHandler: (client: IWebSocketClient, message: IClientServerMessage) => void;
        protected onCloseHandler: (client: IWebSocketClient) => void;
        protected entityFactory: IEntityFactory;
        constructor(entityFactory: IEntityFactory, id: number, client: any);
        protected init(): void;
        protected onMessage(message: any): void;
        protected processMessage(attr: Iterable<[number, any]>): void;
        protected onClose(): void;
        getId(): number;
        getStatus(): WebSocketClientStatus;
        setStatus(status: WebSocketClientStatus): void;
        getSID(): string;
        setSID(sid: string): void;
        getClientId(): number;
        setClientId(clientId: number): void;
        sendMessage(attr: IClientServerMessage): void;
        setOnMessage(handler: (client: IWebSocketClient, message: IClientServerMessage) => void): void;
        setOnClose(handler: (client: IWebSocketClient) => void): void;
        close(): void;
    }
}
declare namespace Estella.Core {
    class WebSocketClientListService implements IWebSocketClientListService {
        protected entityFactory: IEntityFactory;
        private webSocketClientList;
        private lastSocketClientId;
        constructor(entityFactory: IEntityFactory);
        addWebSocketClient(client: any): IWebSocketClient;
        getWebSocketClientListIterator(): IterableIterator<IWebSocketClient>;
        protected getNewSocketClientId(): number;
        close(): void;
    }
}
declare namespace Estella.Core {
    abstract class WebSocketGameServer implements IWebSocketGameServer {
        protected webSocketServer: IWebSocketServer;
        protected gameServer: IGameServer;
        protected engine: IEngine;
        constructor(server: any, engine: IEngine);
        protected init(): void;
        protected onUpdateWorld(world: IWorld, currentStepNumber: number, commandList: ICommand[]): void;
        protected createStepMessage(currentStepNumber: number, commandList: ICommand[]): ClientServerMessageStep;
        protected onClientConnected(client: IWebSocketClient): void;
        protected abstract getClientIdBySID(sid: string): any;
        protected onClientMessage(webSocketClient: IWebSocketClient, message: IClientServerMessage): void;
        protected processCommandList(webSocketClient: IWebSocketClient, message: ClientServerMessageCommandList): void;
        protected initCommandList(webSocketClient: IWebSocketClient, commandList: Iterable<ICommand>): Iterable<ICommand>;
        start(): void;
    }
}
declare namespace Estella.Core {
    class WebSocketServer implements IWebSocketServer {
        private server;
        protected webSocketClientListService: IWebSocketClientListService;
        protected onClientConnectedHandler: (webSocketClient: IWebSocketClient) => void;
        protected onClientDisconnectedHandler: (webSocketClient: IWebSocketClient) => void;
        protected onClientMessageHandler: (webSocketClient: IWebSocketClient, message: IClientServerMessage) => void;
        protected entityFactory: IEntityFactory;
        constructor(server: any, entityFactory: IEntityFactory);
        protected init(): void;
        sendAll(message: IClientServerMessage): void;
        setOnClientConnected(handler: (webSocketClient: IWebSocketClient) => void): void;
        setOnClientMessage(handler: (webSocketClient: IWebSocketClient, message: IClientServerMessage) => void): void;
        setOnClientDisconnected(handler: (webSocketClient: IWebSocketClient) => void): void;
        protected onConnection(client: any): void;
        protected initWebSocketClient(webSocketClient: IWebSocketClient): void;
        protected onClientMessage(webSocketClient: IWebSocketClient, message: IClientServerMessage): void;
        protected onClientDisconnected(webSocketClient: IWebSocketClient): void;
        protected doAuthentication(webSocketClient: IWebSocketClient, message: ClientServerMessageResponseAuthentication): void;
        protected onClientConnected(webSocketClient: IWebSocketClient): void;
        close(): void;
    }
}

declare module 'estella-core' { export default Estella; }