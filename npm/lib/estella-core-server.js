'use strict';
var Estella;
(function (Estella) {
    var Core;
    (function (Core) {
        var ModuleInfo;
        (function (ModuleInfo) {
            ModuleInfo.name = "Estella.Core";
        })(ModuleInfo = Core.ModuleInfo || (Core.ModuleInfo = {}));
    })(Core = Estella.Core || (Estella.Core = {}));
})(Estella || (Estella = {}));
/// <reference path="../../ModuleInfo.ts" />
var Estella;
(function (Estella) {
    var Core;
    (function (Core) {
        class Entity {
            constructor(attributeList, kvpList) {
                this.lastAttributeId = 0;
                this._type = ++this.lastAttributeId;
                this._id = ++this.lastAttributeId;
                if (attributeList) {
                    this.attributeList = attributeList;
                }
                else {
                    this.attributeList = new Core.AttributeListArray();
                }
                if (kvpList) {
                    this.attributeList.setList(kvpList);
                }
                let currentType = this.getType();
                let type = (this.constructor).type;
                if (!type || (currentType && currentType != type)) {
                    throw new Error();
                }
                this.setType(type);
            }
            getType() {
                return this.attributeList.get(this._type);
            }
            setType(type) {
                this.attributeList.set(this._type, type);
            }
            getId() {
                return this.attributeList.get(this._id);
            }
            setId(id) {
                this.attributeList.set(this._id, id);
            }
            getList() {
                return this.attributeList.getList();
            }
            setList(attributeList, clear) {
                this.attributeList.setList(attributeList, clear);
            }
            getIterator() {
                return this.attributeList.getIterator();
            }
            getAttributeList() {
                return this.attributeList;
            }
        }
        Core.Entity = Entity;
        (function (Entity) {
            Entity.type = Core.ModuleInfo.name + '.' + Entity.name;
        })(Entity = Core.Entity || (Core.Entity = {}));
    })(Core = Estella.Core || (Estella.Core = {}));
})(Estella || (Estella = {}));
/// <reference path="../../../Entity/Impl/Entity.ts" />
var Estella;
(function (Estella) {
    var Core;
    (function (Core) {
        class Client extends Core.Entity {
            constructor() {
                super(...arguments);
                this.attributeNameId = ++this.lastAttributeId;
            }
            getName() {
                return this.attributeList.get(this.attributeNameId);
            }
            setName(name) {
                this.attributeList.set(this.attributeNameId, name);
            }
        }
        Core.Client = Client;
        (function (Client) {
            Client.type = Core.ModuleInfo.name + '.' + Client.name;
        })(Client = Core.Client || (Core.Client = {}));
    })(Core = Estella.Core || (Estella.Core = {}));
})(Estella || (Estella = {}));
/// <reference path="../../Entity/Impl/Entity.ts" />
var Estella;
(function (Estella) {
    var Core;
    (function (Core) {
        class Command extends Core.Entity {
            constructor() {
                super(...arguments);
                this._initiatorId = ++this.lastAttributeId;
            }
            getInitiatorId() {
                return this.attributeList.get(this._initiatorId);
            }
            setInitiatorId(id) {
                this.attributeList.set(this._initiatorId, id);
            }
        }
        Core.Command = Command;
        (function (Command) {
            Command.type = Core.ModuleInfo.name + '.' + Command.name;
        })(Command = Core.Command || (Core.Command = {}));
    })(Core = Estella.Core || (Estella.Core = {}));
})(Estella || (Estella = {}));
var Estella;
(function (Estella) {
    var Core;
    (function (Core) {
        class CommandDispatcher {
            constructor() {
                this.commandHandlerList = new Map();
                this.commandHandlerList = new Map();
            }
            execute(command) {
                let handler = this.getHandler(command);
                if (handler.isValid(command)) {
                    handler.execute(command);
                }
            }
            getHandler(command) {
                let handler = this.commandHandlerList.get(command.getType());
                if (handler) {
                    return handler;
                }
                throw new Error();
            }
        }
        Core.CommandDispatcher = CommandDispatcher;
    })(Core = Estella.Core || (Estella.Core = {}));
})(Estella || (Estella = {}));
var Estella;
(function (Estella) {
    var Core;
    (function (Core) {
        class CommandHandler {
            constructor(world) {
                this.world = world;
            }
            execute(command) {
                if (this.isValidCommandType(command)) {
                    this.executeCommand(command);
                }
            }
            isValid(command) {
                if (this.isValidCommandType(command)) {
                    return this.isValidCommand(command);
                }
                return false;
            }
            executeCommand(command) {
            }
            isValidCommand(command) {
                return true;
            }
            isValidCommandType(command) {
                return true;
            }
            startProcess(process) {
                this.world.getProcessListService().add(process);
                this.world.getProcessDispatcher().init(process);
            }
            finishProcess(process) {
                this.world.getProcessDispatcher().finish(process);
            }
        }
        Core.CommandHandler = CommandHandler;
    })(Core = Estella.Core || (Estella.Core = {}));
})(Estella || (Estella = {}));
var Estella;
(function (Estella) {
    var Core;
    (function (Core) {
        class CommandListService {
            constructor() {
                this.commandList = [];
            }
            getCommandList() {
                return this.commandList;
            }
            add(command) {
                this.commandList.push(command);
            }
            setCommandList(commandList) {
                for (let command of commandList) {
                    this.add(command);
                }
            }
            getCommandKeyValuePairList() {
                let list = [];
                for (let command of this.commandList) {
                    list.push(command.getList());
                }
                return list;
            }
            clear() {
                this.commandList = [];
            }
            getAll(condition) {
                return this.filterService.getAll(this.commandList, condition);
            }
            getFirst(condition) {
                return this.filterService.getFirst(this.commandList, condition);
            }
        }
        Core.CommandListService = CommandListService;
    })(Core = Estella.Core || (Estella.Core = {}));
})(Estella || (Estella = {}));
var Estella;
(function (Estella) {
    var Core;
    (function (Core) {
        class AttributeListArray {
            constructor() {
                this.attributeList = [];
            }
            get(attribute, defaultValue) {
                if (attribute >= 0 && attribute < this.attributeList.length) {
                    let value = this.attributeList[attribute];
                    if (value !== undefined) {
                        return this.attributeList[attribute];
                    }
                }
                return defaultValue;
            }
            set(attribute, value) {
                this.attributeList[attribute] = value;
            }
            clear() {
                this.attributeList = [];
            }
            setList(attributeList, clear) {
                if (clear) {
                    this.clear();
                }
                for (let kvp of attributeList) {
                    this.set(kvp[0], kvp[1]);
                }
            }
            rollback() {
            }
            commit() {
            }
            isDirty() {
                return false;
            }
            *getIterator() {
                for (let key = 0; key < this.attributeList.length; key++) {
                    let value = this.attributeList[key];
                    if (value !== undefined) {
                        yield [key, value];
                    }
                }
            }
            has(attribute) {
                if (attribute >= 0 && attribute < this.attributeList.length) {
                    if (this.attributeList[attribute] !== undefined) {
                        return true;
                    }
                }
                return false;
            }
            delete(attribute) {
                this.attributeList[attribute] = undefined;
            }
            getList() {
                let list = [];
                for (let key = 0; key < this.attributeList.length; key++) {
                    let value = this.attributeList[key];
                    if (value !== null && value !== undefined) {
                        list.push([key, value]);
                    }
                }
                return list;
            }
        }
        Core.AttributeListArray = AttributeListArray;
    })(Core = Estella.Core || (Estella.Core = {}));
})(Estella || (Estella = {}));
var Estella;
(function (Estella) {
    var Core;
    (function (Core) {
        class AttributeListMap {
            constructor() {
                this.attributeList = new Map();
            }
            get(attribute, defaultValue) {
                if (this.attributeList.has(attribute)) {
                    return this.attributeList.get(attribute);
                }
                return defaultValue;
            }
            set(attribute, value) {
                this.attributeList.set(attribute, value);
            }
            clear() {
                this.attributeList.clear();
            }
            setList(attributeList, clear) {
                if (clear) {
                    this.clear();
                }
                for (let kvp of attributeList) {
                    this.attributeList.set(kvp[0], kvp[1]);
                }
            }
            rollback() {
            }
            commit() {
            }
            isDirty() {
                return false;
            }
            getIterator() {
                return this.attributeList.entries();
            }
            has(attribute) {
                return this.attributeList.has(attribute);
            }
            delete(attribute) {
                this.attributeList.delete(attribute);
            }
            getList() {
                let list = [];
                for (let kvp of this.attributeList) {
                    if (kvp[1] !== null && kvp[1] !== undefined) {
                        list.push(kvp);
                    }
                }
                return list;
            }
        }
        Core.AttributeListMap = AttributeListMap;
    })(Core = Estella.Core || (Estella.Core = {}));
})(Estella || (Estella = {}));
var Estella;
(function (Estella) {
    var Core;
    (function (Core) {
        class AttributeListMapCommitable {
            constructor() {
                this.commitedAttributeList = new Map();
                this.attributeList = new Map();
                this.deletedAttributeList = new Set();
            }
            get(attribute, defaultValue) {
                if (!this.deletedAttributeList.has(attribute)) {
                    if (this.attributeList.has(attribute)) {
                        return this.attributeList.get(attribute);
                    }
                    if (this.commitedAttributeList.has(attribute)) {
                        return this.commitedAttributeList.get(attribute);
                    }
                }
                return defaultValue;
            }
            set(attribute, value) {
                this.attributeList.set(attribute, value);
                this.deletedAttributeList.delete(attribute);
            }
            clear() {
                this.deletedAttributeList.clear();
                this.commitedAttributeList.clear();
                this.attributeList.clear();
            }
            setList(attributeList, clear) {
                if (clear) {
                    this.clear();
                }
                for (let kvp of attributeList) {
                    this.attributeList.set(kvp[0], kvp[1]);
                }
            }
            has(attribute) {
                if (!this.deletedAttributeList.has(attribute)) {
                    if (this.attributeList.has(attribute)) {
                        return true;
                    }
                    if (this.commitedAttributeList.has(attribute)) {
                        return true;
                    }
                }
                return false;
            }
            rollback() {
                this.attributeList.clear();
                this.deletedAttributeList.clear();
            }
            commit() {
                if (this.isDirty()) {
                    for (let kvp of this.attributeList) {
                        this.commitedAttributeList.set(kvp[0], kvp[1]);
                    }
                    for (let attribute of this.deletedAttributeList) {
                        this.commitedAttributeList.delete(attribute);
                    }
                    this.attributeList.clear();
                    this.deletedAttributeList.clear();
                }
            }
            isDirty() {
                return (this.attributeList.size > 0) || (this.deletedAttributeList.size > 0);
            }
            delete(attribute) {
                this.attributeList.delete(attribute);
                if (this.commitedAttributeList.has(attribute)) {
                    this.deletedAttributeList.add(attribute);
                }
            }
            getIterator() {
                return this.attributeList.entries();
            }
            getList() {
                let list = [];
                for (let kvp of this.attributeList) {
                    list.push(kvp);
                }
                for (let kvp of this.commitedAttributeList) {
                    let attribute = kvp[0];
                    let value = kvp[1];
                    if (!this.attributeList.has(attribute) && !this.deletedAttributeList.has(attribute)) {
                        list.push(kvp);
                    }
                }
                return list;
            }
        }
        Core.AttributeListMapCommitable = AttributeListMapCommitable;
    })(Core = Estella.Core || (Estella.Core = {}));
})(Estella || (Estella = {}));
var Estella;
(function (Estella) {
    var Core;
    (function (Core) {
        class EventEngine {
            constructor(engine, step) {
                this.engine = engine;
                this.step = step;
            }
            getSource() {
                return this.engine;
            }
            getStep() {
                return this.step;
            }
        }
        Core.EventEngine = EventEngine;
    })(Core = Estella.Core || (Estella.Core = {}));
})(Estella || (Estella = {}));
var Estella;
(function (Estella) {
    var Core;
    (function (Core) {
        class EventEntityFactory {
            constructor(entityFactory, entity, type, attr) {
                this.entityFactory = entityFactory;
                this.entity = entity;
                this.type = type;
                this.attr = attr;
            }
            getSource() {
                return this.entityFactory;
            }
            getEntity() {
                return this.entity;
            }
            getType() {
                return this.type;
            }
            getAttr() {
                return this.attr;
            }
        }
        Core.EventEntityFactory = EventEntityFactory;
    })(Core = Estella.Core || (Estella.Core = {}));
})(Estella || (Estella = {}));
var Estella;
(function (Estella) {
    var Core;
    (function (Core) {
        class EventEntityListService {
            constructor(entityListService, entity) {
                this.entityListService = entityListService;
                this.entity = entity;
            }
            getSource() {
                return this.entityListService;
            }
            getEntity() {
                return this.entity;
            }
        }
        Core.EventEntityListService = EventEntityListService;
    })(Core = Estella.Core || (Estella.Core = {}));
})(Estella || (Estella = {}));
var Estella;
(function (Estella) {
    var Core;
    (function (Core) {
        class BaseException {
            constructor(message) {
                this.message = message;
            }
            getMessage() {
                return this.message;
            }
        }
        Core.BaseException = BaseException;
    })(Core = Estella.Core || (Estella.Core = {}));
})(Estella || (Estella = {}));
/// <reference path="BaseException.ts" />
var Estella;
(function (Estella) {
    var Core;
    (function (Core) {
        class NotImplementedException {
        }
        Core.NotImplementedException = NotImplementedException;
    })(Core = Estella.Core || (Estella.Core = {}));
})(Estella || (Estella = {}));
/// <reference path="../../Entity/Impl/Entity.ts" />
var Estella;
(function (Estella) {
    var Core;
    (function (Core) {
        class Item extends Core.Entity {
        }
        Core.Item = Item;
        (function (Item) {
            Item.type = Core.ModuleInfo.name + '.' + Item.name;
        })(Item = Core.Item || (Core.Item = {}));
    })(Core = Estella.Core || (Estella.Core = {}));
})(Estella || (Estella = {}));
/// <reference path="../../Entity/Impl/Entity.ts" />
var Estella;
(function (Estella) {
    var Core;
    (function (Core) {
        class ClientServerMessage extends Core.Entity {
        }
        Core.ClientServerMessage = ClientServerMessage;
        (function (ClientServerMessage) {
            ClientServerMessage.type = Core.ModuleInfo.name + '.' + ClientServerMessage.name;
        })(ClientServerMessage = Core.ClientServerMessage || (Core.ClientServerMessage = {}));
    })(Core = Estella.Core || (Estella.Core = {}));
})(Estella || (Estella = {}));
/// <reference path="ClientServerMessage.ts" />
var Estella;
(function (Estella) {
    var Core;
    (function (Core) {
        class ClientServerMessageCommandList extends Core.ClientServerMessage {
            constructor() {
                super(...arguments);
                this._commandList = ++this.lastAttributeId;
            }
            setCommandList(commandList) {
                this.attributeList.set(this._commandList, commandList);
            }
            getCommandList() {
                return this.attributeList.get(this._commandList);
            }
        }
        Core.ClientServerMessageCommandList = ClientServerMessageCommandList;
        (function (ClientServerMessageCommandList) {
            ClientServerMessageCommandList.type = Core.ModuleInfo.name + '.' + ClientServerMessageCommandList.name;
        })(ClientServerMessageCommandList = Core.ClientServerMessageCommandList || (Core.ClientServerMessageCommandList = {}));
    })(Core = Estella.Core || (Estella.Core = {}));
})(Estella || (Estella = {}));
/// <reference path="ClientServerMessage.ts" />
var Estella;
(function (Estella) {
    var Core;
    (function (Core) {
        class ClientServerMessageInit extends Core.ClientServerMessage {
            constructor() {
                super(...arguments);
                this._clientId = ++this.lastAttributeId;
            }
            setClientId(clientId) {
                this.attributeList.set(this._clientId, clientId);
            }
            getClientId() {
                return this.attributeList.get(this._clientId);
            }
        }
        Core.ClientServerMessageInit = ClientServerMessageInit;
        (function (ClientServerMessageInit) {
            ClientServerMessageInit.type = Core.ModuleInfo.name + '.' + ClientServerMessageInit.name;
        })(ClientServerMessageInit = Core.ClientServerMessageInit || (Core.ClientServerMessageInit = {}));
    })(Core = Estella.Core || (Estella.Core = {}));
})(Estella || (Estella = {}));
/// <reference path="ClientServerMessage.ts" />
var Estella;
(function (Estella) {
    var Core;
    (function (Core) {
        class ClientServerMessageRequestAuthentication extends Core.ClientServerMessage {
        }
        Core.ClientServerMessageRequestAuthentication = ClientServerMessageRequestAuthentication;
        (function (ClientServerMessageRequestAuthentication) {
            ClientServerMessageRequestAuthentication.type = Core.ModuleInfo.name + '.' + ClientServerMessageRequestAuthentication.name;
        })(ClientServerMessageRequestAuthentication = Core.ClientServerMessageRequestAuthentication || (Core.ClientServerMessageRequestAuthentication = {}));
    })(Core = Estella.Core || (Estella.Core = {}));
})(Estella || (Estella = {}));
/// <reference path="ClientServerMessage.ts" />
var Estella;
(function (Estella) {
    var Core;
    (function (Core) {
        class ClientServerMessageResponseAuthentication extends Core.ClientServerMessage {
            constructor() {
                super(...arguments);
                this._sid = ++this.lastAttributeId;
            }
            setSID(sid) {
                this.attributeList.set(this._sid, sid);
            }
            getSID() {
                return this.attributeList.get(this._sid);
            }
        }
        Core.ClientServerMessageResponseAuthentication = ClientServerMessageResponseAuthentication;
        (function (ClientServerMessageResponseAuthentication) {
            ClientServerMessageResponseAuthentication.type = Core.ModuleInfo.name + '.' + ClientServerMessageResponseAuthentication.name;
        })(ClientServerMessageResponseAuthentication = Core.ClientServerMessageResponseAuthentication || (Core.ClientServerMessageResponseAuthentication = {}));
    })(Core = Estella.Core || (Estella.Core = {}));
})(Estella || (Estella = {}));
/// <reference path="ClientServerMessage.ts" />
var Estella;
(function (Estella) {
    var Core;
    (function (Core) {
        class ClientServerMessageStep extends Core.ClientServerMessage {
            constructor() {
                super(...arguments);
                this._commandList = ++this.lastAttributeId;
                this._stepNumber = ++this.lastAttributeId;
            }
            setCommandList(commandList) {
                let commandAttributeList = [];
                if (commandList) {
                    for (let command of commandList) {
                        commandAttributeList.push(command.getList());
                    }
                }
                this.attributeList.set(this._commandList, commandAttributeList);
            }
            getCommandList() {
                return this.attributeList.get(this._commandList);
            }
            getStepNumber() {
                return this.attributeList.get(this._stepNumber);
            }
            setStepNumber(stepNumber) {
                this.attributeList.set(this._stepNumber, stepNumber);
            }
        }
        Core.ClientServerMessageStep = ClientServerMessageStep;
        (function (ClientServerMessageStep) {
            ClientServerMessageStep.type = Core.ModuleInfo.name + '.' + ClientServerMessageStep.name;
        })(ClientServerMessageStep = Core.ClientServerMessageStep || (Core.ClientServerMessageStep = {}));
    })(Core = Estella.Core || (Estella.Core = {}));
})(Estella || (Estella = {}));
/// <reference path="ClientServerMessage.ts" />
var Estella;
(function (Estella) {
    var Core;
    (function (Core) {
        class ClientServerMessageStepList extends Core.ClientServerMessage {
            constructor() {
                super(...arguments);
                this._stepList = ++this.lastAttributeId;
            }
            setStepList(stepList) {
                let stepAttributeList = [];
                if (stepList) {
                    for (let step of stepList) {
                        stepAttributeList.push(step.getList());
                    }
                }
                this.attributeList.set(this._stepList, stepAttributeList);
            }
            getStepList() {
                return this.attributeList.get(this._stepList);
            }
        }
        Core.ClientServerMessageStepList = ClientServerMessageStepList;
        (function (ClientServerMessageStepList) {
            ClientServerMessageStepList.type = Core.ModuleInfo.name + '.' + ClientServerMessageStepList.name;
        })(ClientServerMessageStepList = Core.ClientServerMessageStepList || (Core.ClientServerMessageStepList = {}));
    })(Core = Estella.Core || (Estella.Core = {}));
})(Estella || (Estella = {}));
/// <reference path="ClientServerMessage.ts" />
var Estella;
(function (Estella) {
    var Core;
    (function (Core) {
        class ClientServerMessageWorldFullInfo extends Core.ClientServerMessage {
            constructor() {
                super(...arguments);
                this._worldAttributeList = ++this.lastAttributeId;
                this._clientListService = ++this.lastAttributeId;
                this._itemListService = ++this.lastAttributeId;
                this._processListService = ++this.lastAttributeId;
            }
            setWorld(world) {
                this.setWorldAttributeList(world.getWorldAttributeList());
                this.setClientListService(world.getClientListService());
                this.setItemListService(world.getItemListService());
                this.setProcessListService(world.getProcessListService());
            }
            setWorldAttributeList(worldAttributeList) {
                this.attributeList.set(this._worldAttributeList, worldAttributeList.getList());
            }
            getWorldAttributeList() {
                return this.attributeList.get(this._worldAttributeList);
            }
            setClientListService(clientListService) {
                this.attributeList.set(this._clientListService, clientListService.serialize());
            }
            getClientListService() {
                return this.attributeList.get(this._clientListService);
            }
            setItemListService(itemListService) {
                this.attributeList.set(this._itemListService, itemListService.serialize());
            }
            getItemListService() {
                return this.attributeList.get(this._itemListService);
            }
            setProcessListService(processListService) {
                this.attributeList.set(this._processListService, processListService.getList());
            }
            getProcessListService() {
                return this.attributeList.get(this._processListService);
            }
        }
        Core.ClientServerMessageWorldFullInfo = ClientServerMessageWorldFullInfo;
        (function (ClientServerMessageWorldFullInfo) {
            ClientServerMessageWorldFullInfo.type = Core.ModuleInfo.name + '.' + ClientServerMessageWorldFullInfo.name;
        })(ClientServerMessageWorldFullInfo = Core.ClientServerMessageWorldFullInfo || (Core.ClientServerMessageWorldFullInfo = {}));
    })(Core = Estella.Core || (Estella.Core = {}));
})(Estella || (Estella = {}));
/// <reference path="../../../Entity/Impl/Entity.ts" />
var Estella;
(function (Estella) {
    var Core;
    (function (Core) {
        class Process extends Core.Entity {
            constructor() {
                super(...arguments);
                this._processStatus = ++this.lastAttributeId;
                this._initStep = ++this.lastAttributeId;
                this._finishStep = ++this.lastAttributeId;
            }
            getStatus() {
                return this.attributeList.get(this._processStatus, Core.ProcessStatus.Init);
            }
            setStatus(processStatus) {
                this.attributeList.set(this._processStatus, processStatus);
            }
            getInitStep() {
                return this.attributeList.get(this._initStep, 0);
            }
            setInitStep(initStep) {
                this.attributeList.set(this._initStep, initStep);
            }
            getFinishStep() {
                return this.attributeList.get(this._finishStep, 0);
            }
            setFinishStep(finishStep) {
                this.attributeList.set(this._finishStep, finishStep);
            }
        }
        Core.Process = Process;
        (function (Process) {
            Process.type = Core.ModuleInfo.name + '.' + Process.name;
        })(Process = Core.Process || (Core.Process = {}));
    })(Core = Estella.Core || (Estella.Core = {}));
})(Estella || (Estella = {}));
var Estella;
(function (Estella) {
    var Core;
    (function (Core) {
        (function (ProcessStatus) {
            ProcessStatus[ProcessStatus["Unknown"] = 0] = "Unknown";
            ProcessStatus[ProcessStatus["Init"] = 1] = "Init";
            ProcessStatus[ProcessStatus["Executing"] = 2] = "Executing";
            ProcessStatus[ProcessStatus["Finished"] = 3] = "Finished";
        })(Core.ProcessStatus || (Core.ProcessStatus = {}));
        var ProcessStatus = Core.ProcessStatus;
    })(Core = Estella.Core || (Estella.Core = {}));
})(Estella || (Estella = {}));
var Estella;
(function (Estella) {
    var Core;
    (function (Core) {
        (function (ProcessType) {
            ProcessType[ProcessType["Unknown"] = 0] = "Unknown";
        })(Core.ProcessType || (Core.ProcessType = {}));
        var ProcessType = Core.ProcessType;
    })(Core = Estella.Core || (Estella.Core = {}));
})(Estella || (Estella = {}));
var Estella;
(function (Estella) {
    var Core;
    (function (Core) {
        class ProcessDispatcher {
            constructor() {
                this.processHandlerList = new Map();
            }
            execute(process) {
                let processStatus = process.getStatus();
                if (processStatus === Core.ProcessStatus.Executing) {
                    let handler = this.getHandler(process);
                    handler.execute(process);
                }
            }
            init(process) {
                let processStatus = process.getStatus();
                if (processStatus === Core.ProcessStatus.Init) {
                    let handler = this.getHandler(process);
                    handler.init(process);
                }
            }
            finish(process) {
                let processStatus = process.getStatus();
                if (processStatus !== Core.ProcessStatus.Finished) {
                    let handler = this.getHandler(process);
                    handler.finish(process);
                }
            }
            getHandler(process) {
                let handler = this.processHandlerList.get(process.getType());
                if (handler) {
                    return handler;
                }
                throw new Error();
            }
        }
        Core.ProcessDispatcher = ProcessDispatcher;
    })(Core = Estella.Core || (Estella.Core = {}));
})(Estella || (Estella = {}));
var Estella;
(function (Estella) {
    var Core;
    (function (Core) {
        class ProcessHandler {
            constructor(world) {
                this.world = world;
            }
            init(process) {
                if (this.isValidProcessType(process)) {
                    this.initProcess(process);
                    this.setInitStep(process);
                    if (process.getStatus() === Core.ProcessStatus.Init) {
                        process.setStatus(Core.ProcessStatus.Executing);
                    }
                    else if (process.getStatus() === Core.ProcessStatus.Finished) {
                        this.setFinishStep(process);
                    }
                }
            }
            execute(process) {
                if (this.isValidProcessType(process)) {
                    this.executeProcess(process);
                }
            }
            finish(process) {
                if (this.isValidProcessType(process)) {
                    this.finishProcess(process);
                    process.setStatus(Core.ProcessStatus.Finished);
                    this.setFinishStep(process);
                }
            }
            setInitStep(process) {
                process.setInitStep(this.world.getWorldAttributeList().getStepNumber());
            }
            setFinishStep(process) {
                process.setFinishStep(this.world.getWorldAttributeList().getStepNumber());
            }
            initProcess(process) {
            }
            executeProcess(process) {
            }
            finishProcess(process) {
            }
            isValidProcessType(command) {
                return true;
            }
            startProcess(process) {
                this.world.getProcessListService().add(process);
                this.world.getProcessDispatcher().init(process);
            }
        }
        Core.ProcessHandler = ProcessHandler;
    })(Core = Estella.Core || (Estella.Core = {}));
})(Estella || (Estella = {}));
var Estella;
(function (Estella) {
    var Core;
    (function (Core) {
        class ProcessListService {
            constructor() {
                this.processList = [];
                this.filterService = new Core.FilterService();
            }
            init(processList) {
                this.processList = [];
                for (let p of processList) {
                    this.add(p);
                }
            }
            getProcessList() {
                return this.processList;
            }
            add(process) {
                this.processList.push(process);
            }
            removeFinished() {
                let list;
                for (let i = this.processList.length - 1; i >= 0; i--) {
                    let process = this.processList[i];
                    if (process.getStatus() == Core.ProcessStatus.Finished) {
                        this.processList.splice(i, 1);
                    }
                }
            }
            clear() {
                this.processList = [];
            }
            *getIterator() {
                for (let process of this.processList) {
                    yield process;
                }
            }
            getList() {
                let iterator = this.getIterator();
                let list = [];
                for (let entity of iterator) {
                    list.push(entity.getList());
                }
                return list;
            }
            setList(entityList, clear) {
                if (clear) {
                    this.clear();
                }
                for (let entity of entityList) {
                    this.add(entity);
                }
            }
            getAll(condition) {
                return this.filterService.getAll(this.processList, condition);
            }
            getFirst(condition) {
                return this.filterService.getFirst(this.processList, condition);
            }
        }
        Core.ProcessListService = ProcessListService;
    })(Core = Estella.Core || (Estella.Core = {}));
})(Estella || (Estella = {}));
var Estella;
(function (Estella) {
    var Core;
    (function (Core) {
        class ProcessListServiceCommitable {
            constructor() {
                this.processList = [];
                this.filterService = new Core.FilterService();
                this.firstUncommitedIndex = 0;
            }
            getProcessList() {
                return this.processList;
            }
            add(process) {
                this.processList.push(process);
            }
            init(processList) {
                this.processList = [];
                for (let p of processList) {
                    this.add(p);
                }
            }
            removeFinished() {
                let list;
                for (let i = this.firstUncommitedIndex - 1; i >= 0; i--) {
                    let process = this.processList[i];
                    if (process.getStatus() == Core.ProcessStatus.Finished) {
                        this.processList.splice(i, 1);
                        this.firstUncommitedIndex--;
                    }
                }
            }
            clear() {
                this.processList = [];
                this.firstUncommitedIndex = 0;
            }
            getIterator() {
                return this.processList.values();
            }
            getList() {
                let iterator = this.getIterator();
                let list = [];
                for (let entity of iterator) {
                    list.push(entity.getList());
                }
                return list;
            }
            setList(processList, clear) {
                if (clear) {
                    this.clear();
                }
                for (let entity of processList) {
                    this.add(entity);
                }
            }
            commit() {
                for (let process of this.processList) {
                    process.getAttributeList().commit();
                }
                this.firstUncommitedIndex = this.processList.length;
            }
            rollback() {
                if (this.processList.length > this.firstUncommitedIndex) {
                    this.processList.splice(this.firstUncommitedIndex);
                }
                for (let process of this.processList) {
                    process.getAttributeList().rollback();
                }
            }
            isDirty() {
                if (this.processList.length > this.firstUncommitedIndex) {
                    return true;
                }
                for (let process of this.processList) {
                    if (process.getAttributeList().isDirty()) {
                        return true;
                    }
                }
                return false;
            }
            getAll(condition) {
                return this.filterService.getAll(this.processList.values(), condition);
            }
            getFirst(condition) {
                return this.filterService.getFirst(this.processList.values(), condition);
            }
        }
        Core.ProcessListServiceCommitable = ProcessListServiceCommitable;
    })(Core = Estella.Core || (Estella.Core = {}));
})(Estella || (Estella = {}));
var Estella;
(function (Estella) {
    var Core;
    (function (Core) {
        class Engine {
            constructor(world, commandListService) {
                this.onBeforeUpdate = new Core.LiteEvent();
                this.onAfterUpdate = new Core.LiteEvent();
                this.world = world;
                this.commandListService = commandListService;
                this.processListService = world.getProcessListService();
                this.processDispatcher = world.getProcessDispatcher();
                this.commandDispatcher = world.getCommandDispatcher();
            }
            getWorld() {
                return this.world;
            }
            getCommandListService() {
                return this.commandListService;
            }
            update() {
                this.triggerEvent(this.onBeforeUpdate, this.getStep());
                this.increaseStepNumber();
                this.processCommandList();
                for (let i = 0; i < this.processListService.getProcessList().length; i++) {
                    let process = this.processListService.getProcessList()[i];
                    this.processDispatcher.execute(process);
                }
                this.processListService.removeFinished();
                this.triggerEvent(this.onAfterUpdate, this.getStep());
            }
            getStep() {
                return this.world.getWorldAttributeList().getStepNumber();
            }
            increaseStepNumber() {
                let stepNumber = this.getStep() + 1;
                this.world.getWorldAttributeList().setStepNumber(stepNumber);
            }
            getCommandList() {
                return this.commandListService.getCommandList();
            }
            processCommandList() {
                let commandList = this.commandListService.getCommandList();
                for (let command of commandList) {
                    this.commandDispatcher.execute(command);
                }
                this.commandListService.clear();
            }
            triggerEvent(event, step) {
                if (event.getCount() > 0) {
                    let e = new Core.EventEngine(this, step);
                    event.trigger(e);
                }
            }
            beforeUpdate() {
                return this.onBeforeUpdate;
            }
            afterUpdate() {
                return this.onAfterUpdate;
            }
        }
        Core.Engine = Engine;
    })(Core = Estella.Core || (Estella.Core = {}));
})(Estella || (Estella = {}));
var Estella;
(function (Estella) {
    var Core;
    (function (Core) {
        class EntityFactory {
            constructor(initEntityHandler) {
                this.itemAttributeType = 1;
                this.onBeforeCreate = new Core.LiteEvent();
                this.onAfterCreate = new Core.LiteEvent();
                this.onBeforeRestore = new Core.LiteEvent();
                this.onAfterRestore = new Core.LiteEvent();
                this.onBeforeInit = new Core.LiteEvent();
                this.onAfterInit = new Core.LiteEvent();
                this.entityList = new Map();
                this.initEntityHandler = initEntityHandler;
            }
            set(t) {
                this.entityList.set(t.type, t);
            }
            has(t) {
                let type = this.getType(t);
                return this.entityList.has(type);
            }
            delete(t) {
                let type = this.getType(t);
            }
            getType(t) {
                if (typeof (t) === "string") {
                    return t;
                }
                return t.type;
            }
            getItemType(attr) {
                for (var kvp of attr) {
                    if (kvp[0] == this.itemAttributeType) {
                        return kvp[1];
                    }
                }
                throw new Error();
            }
            *restoreList(attrList, baseClass) {
                for (let attr of attrList) {
                    yield this.restore(attr, baseClass);
                }
            }
            createByType(type, attr) {
                if (this.entityList.has(type)) {
                    let t = this.entityList.get(type);
                    let entity = new t(this.createAttributeList(type), attr);
                    this.initEntity(entity);
                    return entity;
                }
                throw new Error(type);
            }
            restore(attr, t) {
                let entity;
                this.triggerEvent(this.onBeforeRestore, entity, t, attr);
                let type = this.getItemType(attr);
                if (type) {
                    entity = this.createByType(type, attr);
                    if (entity instanceof t) {
                        this.triggerEvent(this.onAfterRestore, entity, t, attr);
                        return entity;
                    }
                }
                throw new Error(JSON.stringify(attr));
            }
            create(t) {
                let entity;
                this.triggerEvent(this.onBeforeCreate, entity, t);
                entity = this.createByType(t.type);
                if (entity instanceof t) {
                    this.triggerEvent(this.onAfterCreate, entity, t);
                    return entity;
                }
                throw new Error();
            }
            createByAttr(attr) {
                var itemType = this.getItemType(attr);
                return this.createByType(itemType, attr);
            }
            initEntity(entity, t, attr) {
                this.triggerEvent(this.onBeforeInit, entity, t, attr);
                if (this.initEntityHandler) {
                    this.initEntityHandler(entity, t, attr);
                }
                this.triggerEvent(this.onAfterInit, entity, t, attr);
            }
            createAttributeList(type) {
                return new Core.AttributeListArray();
            }
            triggerEvent(event, entity, type, attr) {
                if (event.getCount() > 0) {
                    let e = new Core.EventEntityFactory(this, entity, type, attr);
                    event.trigger(e);
                }
            }
            beforeCreate() {
                return this.onBeforeCreate;
            }
            afterCreate() {
                return this.onAfterCreate;
            }
            beforeRestore() {
                return this.onBeforeRestore;
            }
            afterRestore() {
                return this.onAfterRestore;
            }
            beforeInit() {
                return this.onBeforeInit;
            }
            afterInit() {
                return this.onAfterInit;
            }
        }
        Core.EntityFactory = EntityFactory;
    })(Core = Estella.Core || (Estella.Core = {}));
})(Estella || (Estella = {}));
var Estella;
(function (Estella) {
    var Core;
    (function (Core) {
        class EntityListService {
            constructor() {
                this.onBeforeAdd = new Core.LiteEvent();
                this.onAfterAdd = new Core.LiteEvent();
                this.onBeforeRemove = new Core.LiteEvent();
                this.onAfterRemove = new Core.LiteEvent();
                this.onBeforeClear = new Core.LiteEvent();
                this.onAfterClear = new Core.LiteEvent();
                this.itemList = new Map();
                this.filterService = new Core.FilterService();
            }
            init(itemList) {
                this.itemList.clear();
                for (let item of itemList) {
                    this.add(item);
                }
            }
            get(itemId) {
                return this.itemList.get(itemId);
            }
            getSize() {
                return this.itemList.size;
            }
            add(item) {
                this.triggerEvent(this.onBeforeAdd, item);
                let itemId = item.getId();
                this.itemList.set(itemId, item);
                this.triggerEvent(this.onAfterAdd, item);
            }
            has(id) {
                return this.itemList.has(id);
            }
            remove(id) {
                let item = this.get(id);
                if (item) {
                    this.triggerEvent(this.onBeforeRemove, item);
                    this.itemList.delete(id);
                    this.triggerEvent(this.onAfterRemove, item);
                }
            }
            clear() {
                this.triggerEvent(this.onBeforeClear);
                this.itemList.clear();
                this.triggerEvent(this.onAfterClear);
            }
            getIterator() {
                return this.itemList.values();
            }
            serialize() {
                let iterator = this.getIterator();
                let list = [];
                for (let entity of iterator) {
                    list.push(entity.getList());
                }
                return list;
            }
            setList(entityList, clear) {
                if (clear) {
                    this.clear();
                }
                for (let entity of entityList) {
                    this.add(entity);
                }
            }
            getAll(condition) {
                return this.filterService.getAll(this.itemList.values(), condition);
            }
            getFirst(condition) {
                return this.filterService.getFirst(this.itemList.values(), condition);
            }
            getTyped(itemId, type) {
                let item = this.get(itemId);
                if (item instanceof type) {
                    return item;
                }
                return undefined;
            }
            triggerEvent(event, item) {
                if (event.getCount() > 0) {
                    let e = new Core.EventEntityListService(this, item);
                    event.trigger(e);
                }
            }
            beforeAdd() {
                return this.onBeforeAdd;
            }
            afterAdd() {
                return this.onAfterAdd;
            }
            beforeRemove() {
                return this.onBeforeRemove;
            }
            afterRemove() {
                return this.onAfterRemove;
            }
            beforeClear() {
                return this.onBeforeClear;
            }
            afterClear() {
                return this.onAfterClear;
            }
        }
        Core.EntityListService = EntityListService;
    })(Core = Estella.Core || (Estella.Core = {}));
})(Estella || (Estella = {}));
var Estella;
(function (Estella) {
    var Core;
    (function (Core) {
        class EntityListServiceCommitable {
            constructor() {
                this.onBeforeAdd = new Core.LiteEvent();
                this.onBeforeRemove = new Core.LiteEvent();
                this.deletedItemIdList = new Set();
                this.itemListService = new Core.EntityListService();
                this.filterService = new Core.FilterService();
            }
            init(itemList) {
                this.clear();
                this.itemListService.init(itemList);
            }
            get(id) {
                if (!this.deletedItemIdList.has(id)) {
                    return this.itemListService.get(id);
                }
                return undefined;
            }
            has(id) {
                if (!this.deletedItemIdList.has(id)) {
                    return this.itemListService.has(id);
                }
                return false;
            }
            getSize() {
                return (this.itemListService.getSize() - this.deletedItemIdList.size);
            }
            add(item) {
                this.onBeforeAdd.trigger(item);
                this.itemListService.add(item);
                this.newItemIdList.add(item.getId());
            }
            isItemNotDeleted(item) {
                return !this.deletedItemIdList.has(item.getId());
            }
            getIterator() {
                return this.filterService.getAll(this.itemListService.getIterator(), this.isItemNotDeleted.bind(this));
            }
            serialize() {
                let iterator = this.getIterator();
                let list = [];
                for (let entity of iterator) {
                    list.push(entity.getList());
                }
                return list;
            }
            setList(entityList, clear) {
                if (clear) {
                    this.clear();
                }
                for (let entity of entityList) {
                    this.add(entity);
                }
            }
            remove(id) {
                if (this.itemListService.has(id) && !this.deletedItemIdList.has(id)) {
                    this.deletedItemIdList.add(id);
                }
            }
            clear() {
                this.itemListService.clear();
                this.deletedItemIdList.clear();
                this.newItemIdList.clear();
            }
            commit() {
                for (let itemId of this.deletedItemIdList) {
                    this.itemListService.remove(itemId);
                }
                this.newItemIdList.clear();
                this.deletedItemIdList.clear();
                for (let o of this.itemListService.getIterator()) {
                    o.getAttributeList().commit();
                }
            }
            rollback() {
                for (let itemId of this.newItemIdList) {
                    this.itemListService.remove(itemId);
                }
                this.newItemIdList.clear();
                this.deletedItemIdList.clear();
                for (let o of this.itemListService.getIterator()) {
                    o.getAttributeList().rollback();
                }
            }
            isDirty() {
                if (this.newItemIdList.size > 0) {
                    return true;
                }
                if (this.deletedItemIdList.size > 0) {
                    return true;
                }
                for (let o of this.itemListService.getIterator()) {
                    if (o.getAttributeList().isDirty()) {
                        return true;
                    }
                }
                return false;
            }
            getAll(condition) {
                return this.filterService.getAll(this.getIterator(), condition);
            }
            getFirst(condition) {
                return this.filterService.getFirst(this.getIterator(), condition);
            }
            getTyped(itemId, type) {
                let item = this.get(itemId);
                if (item instanceof type) {
                    return item;
                }
                return undefined;
            }
            beforeAdd() {
                return this.onBeforeAdd;
            }
            beforeRemove() {
                return this.onBeforeRemove;
            }
        }
        Core.EntityListServiceCommitable = EntityListServiceCommitable;
    })(Core = Estella.Core || (Estella.Core = {}));
})(Estella || (Estella = {}));
var Estella;
(function (Estella) {
    var Core;
    (function (Core) {
        class FilterService {
            *getAll(itemList, condition) {
                for (let item of itemList) {
                    if (condition(item)) {
                        yield item;
                    }
                }
            }
            getFirst(itemList, condition) {
                for (let item of itemList) {
                    if (condition(item)) {
                        return item;
                    }
                }
                return null;
            }
        }
        Core.FilterService = FilterService;
    })(Core = Estella.Core || (Estella.Core = {}));
})(Estella || (Estella = {}));
var Estella;
(function (Estella) {
    var Core;
    (function (Core) {
        class GameServer {
            constructor(engine) {
                this.engine = engine;
                var tickLength = engine.getWorld().getWorldAttributeList().getTickLength();
                //let tickLength = 100;
                this.metronome = new Core.Metronome(tickLength);
                this.commandLog = [];
                this.emptyCommandList = [];
                this.timerId = 0;
            }
            start() {
                this.metronome.start();
                this.timerId = setInterval(this.updateWorld.bind(this), 10);
            }
            getCommandLog(startStepNumber) {
                return this.commandLog;
            }
            updateWorld() {
                let metronomeStepNumber = this.metronome.getTickCount();
                let currentStepNumber = this.getStepNumber();
                while (currentStepNumber < metronomeStepNumber) {
                    currentStepNumber += 1;
                    let commandList = this.engine.getCommandList();
                    this.commandLog[currentStepNumber] = commandList;
                    this.engine.update();
                    if (this.onUpdateWorld) {
                        this.onUpdateWorld(this.engine.getWorld(), currentStepNumber, commandList);
                    }
                }
            }
            getStepNumber() {
                return this.engine.getWorld().getWorldAttributeList().getStepNumber();
            }
            setOnUpdateWorld(handler) {
                this.onUpdateWorld = handler;
            }
        }
        Core.GameServer = GameServer;
    })(Core = Estella.Core || (Estella.Core = {}));
})(Estella || (Estella = {}));
var Estella;
(function (Estella) {
    var Core;
    (function (Core) {
        class LiteEvent {
            constructor() {
                this.handlers = [];
            }
            getCount() {
                return this.handlers.length;
            }
            on(handler) {
                this.handlers.push(handler);
            }
            off(handler) {
                this.handlers = this.handlers.filter(h => h !== handler);
            }
            trigger(data) {
                for (let handler of this.handlers) {
                    handler(data);
                }
            }
        }
        Core.LiteEvent = LiteEvent;
    })(Core = Estella.Core || (Estella.Core = {}));
})(Estella || (Estella = {}));
var Estella;
(function (Estella) {
    var Core;
    (function (Core) {
        class Metronome {
            constructor(tickLength) {
                this.tickLength = tickLength;
                this.isPaused = true;
                this.pauseLength = 0;
            }
            start(startTime) {
                if (!startTime) {
                    this.startTime = Date.now();
                }
                else {
                    this.startTime = startTime;
                }
                this.pauseStart = this.startTime;
                this.resume();
            }
            getStartTime() {
                return this.startTime;
            }
            pause() {
                if (!this.isPaused) {
                    this.pauseStart = Date.now();
                    this.isPaused = true;
                }
            }
            resume() {
                if (this.isPaused) {
                    let pauseEnd = Date.now();
                    this.pauseLength += (pauseEnd - this.pauseStart);
                    this.isPaused = false;
                }
            }
            getTickLength() {
                return this.tickLength;
            }
            getTickCount() {
                let totalTime = Date.now() - this.startTime - this.pauseLength;
                return Math.floor(totalTime / this.tickLength);
            }
        }
        Core.Metronome = Metronome;
    })(Core = Estella.Core || (Estella.Core = {}));
})(Estella || (Estella = {}));
var Estella;
(function (Estella) {
    var Core;
    (function (Core) {
        class ServiceAttributeType {
        }
        ServiceAttributeType.LastId = "LastId";
        Core.ServiceAttributeType = ServiceAttributeType;
    })(Core = Estella.Core || (Estella.Core = {}));
})(Estella || (Estella = {}));
var Estella;
(function (Estella) {
    var Core;
    (function (Core) {
        class World {
            constructor(worldAttributeList) {
                this.worldAttributeList = worldAttributeList;
            }
            initEntityFactory(entityFactory) {
                entityFactory.set(Core.ClientServerMessageCommandList);
                entityFactory.set(Core.ClientServerMessageInit);
                entityFactory.set(Core.ClientServerMessageRequestAuthentication);
                entityFactory.set(Core.ClientServerMessageResponseAuthentication);
                entityFactory.set(Core.ClientServerMessageStep);
                entityFactory.set(Core.ClientServerMessageStepList);
                entityFactory.set(Core.ClientServerMessageWorldFullInfo);
            }
            getWorldAttributeList() {
                return this.worldAttributeList;
            }
            getProcessDispatcher() {
                return this.processDispatcher;
            }
            getCommandDispatcher() {
                return this.commandDispatcher;
            }
            getItemListService() {
                return this.itemListService;
            }
            getProcessListService() {
                return this.processListService;
            }
            getClientListService() {
                return this.clientListService;
            }
            getEntityFactory() {
                return this.entityFactory;
            }
            getItemId() {
                var id = this.worldAttributeList.getLastItemId() + 1;
                this.worldAttributeList.setLastItemId(id);
                return id;
            }
            getProcessId() {
                var id = this.worldAttributeList.getLastProcessId() + 1;
                this.worldAttributeList.setLastProcessId(id);
                return id;
            }
        }
        Core.World = World;
    })(Core = Estella.Core || (Estella.Core = {}));
})(Estella || (Estella = {}));
/// <reference path="../../Entity/Impl/Entity.ts" />
var Estella;
(function (Estella) {
    var Core;
    (function (Core) {
        class WorldAttributeList extends Core.Entity {
            constructor() {
                super(...arguments);
                this._tickLength = ++this.lastAttributeId;
                this._processId = ++this.lastAttributeId;
                this._lastObjectId = ++this.lastAttributeId;
                this._stepNumber = ++this.lastAttributeId;
            }
            getTickLength() {
                return this.attributeList.get(this._tickLength, 20);
            }
            setTickLength(tickLength) {
                this.attributeList.set(this._tickLength, tickLength);
            }
            getLastProcessId() {
                return this.attributeList.get(this._processId, 0);
            }
            setLastProcessId(id) {
                this.attributeList.set(this._processId, id);
            }
            getLastItemId() {
                return this.attributeList.get(this._lastObjectId, 0);
            }
            setLastItemId(id) {
                this.attributeList.set(this._lastObjectId, id);
            }
            getStepNumber() {
                return this.attributeList.get(this._stepNumber, 0);
            }
            setStepNumber(stepNumber) {
                this.attributeList.set(this._stepNumber, stepNumber);
            }
        }
        Core.WorldAttributeList = WorldAttributeList;
        (function (WorldAttributeList) {
            WorldAttributeList.LastTypeId = 0;
            WorldAttributeList.Type = ++WorldAttributeList.LastTypeId;
        })(WorldAttributeList = Core.WorldAttributeList || (Core.WorldAttributeList = {}));
    })(Core = Estella.Core || (Estella.Core = {}));
})(Estella || (Estella = {}));
var Estella;
(function (Estella) {
    var Core;
    (function (Core) {
        var Server;
        (function (Server) {
            class WebSocketClient {
                constructor(entityFactory, id, client) {
                    this.onAfterMessage = new Core.LiteEvent();
                    this.onBeforeClose = new Core.LiteEvent();
                    this.onAfterClose = new Core.LiteEvent();
                    this.entityFactory = entityFactory;
                    this.id = id;
                    this.client = client;
                    this.setStatus(Server.WebSocketClientStatus.Initialization);
                    this.init();
                }
                init() {
                    this.client.on('message', this.onSocketMessage.bind(this));
                    this.client.on('close', this.onSocketClose.bind(this));
                }
                onSocketMessage(ev) {
                    if (this.status != Server.WebSocketClientStatus.Disconnected) {
                        this.processMessage(JSON.parse(ev));
                    }
                }
                onSocketClose(ev) {
                    this.onAfterClose.trigger(new Server.EventWebSocketClientMessage(this, ev));
                }
                processMessage(attr) {
                    if (attr) {
                        try {
                            var message = this.entityFactory.restore(attr, Core.ClientServerMessage);
                            this.onAfterMessage.trigger(new Server.EventWebSocketClientMessage(this, message));
                        }
                        catch (e) {
                            console.log(e);
                            this.status = Server.WebSocketClientStatus.Disconnected;
                        }
                    }
                }
                getId() {
                    return this.id;
                }
                getStatus() {
                    return this.status;
                }
                setStatus(status) {
                    this.status = status;
                }
                getSID() {
                    return this.sid;
                }
                setSID(sid) {
                    this.sid = sid;
                }
                getClientId() {
                    return this.clientId;
                }
                setClientId(clientId) {
                    this.clientId = clientId;
                }
                close() {
                    this.onBeforeClose.trigger(new Server.EventWebSocketClientMessage(this, null));
                    this.client.close();
                }
                sendMessage(attr) {
                    try {
                        this.client.send(JSON.stringify(attr.getList()));
                    }
                    catch (e) {
                        console.log(e);
                        this.status = Server.WebSocketClientStatus.Disconnected;
                    }
                }
                afterMessage() {
                    return this.onAfterMessage;
                }
                beforeClose() {
                    return this.onBeforeClose;
                }
                afterClose() {
                    return this.onAfterClose;
                }
            }
            Server.WebSocketClient = WebSocketClient;
        })(Server = Core.Server || (Core.Server = {}));
    })(Core = Estella.Core || (Estella.Core = {}));
})(Estella || (Estella = {}));
var Estella;
(function (Estella) {
    var Core;
    (function (Core) {
        var Server;
        (function (Server) {
            (function (WebSocketClientStatus) {
                WebSocketClientStatus[WebSocketClientStatus["Initialization"] = 0] = "Initialization";
                WebSocketClientStatus[WebSocketClientStatus["Connected"] = 1] = "Connected";
                WebSocketClientStatus[WebSocketClientStatus["Disconnected"] = 2] = "Disconnected";
            })(Server.WebSocketClientStatus || (Server.WebSocketClientStatus = {}));
            var WebSocketClientStatus = Server.WebSocketClientStatus;
        })(Server = Core.Server || (Core.Server = {}));
    })(Core = Estella.Core || (Estella.Core = {}));
})(Estella || (Estella = {}));
var Estella;
(function (Estella) {
    var Core;
    (function (Core) {
        var Server;
        (function (Server) {
            class EventWebSocketClientClose {
                constructor(webSocketClient, data) {
                    this.webSocketClient = webSocketClient;
                    this.data = data;
                }
                getSource() {
                    return this.webSocketClient;
                }
                getData() {
                    return this.data;
                }
            }
            Server.EventWebSocketClientClose = EventWebSocketClientClose;
        })(Server = Core.Server || (Core.Server = {}));
    })(Core = Estella.Core || (Estella.Core = {}));
})(Estella || (Estella = {}));
var Estella;
(function (Estella) {
    var Core;
    (function (Core) {
        var Server;
        (function (Server) {
            class EventWebSocketClientMessage {
                constructor(webSocketClient, message) {
                    this.webSocketClient = webSocketClient;
                    this.message = message;
                }
                getSource() {
                    return this.webSocketClient;
                }
                getMessage() {
                    return this.message;
                }
            }
            Server.EventWebSocketClientMessage = EventWebSocketClientMessage;
        })(Server = Core.Server || (Core.Server = {}));
    })(Core = Estella.Core || (Estella.Core = {}));
})(Estella || (Estella = {}));
module.exports = Estella;
module.exports['default'] = Estella;
var Estella;
(function (Estella) {
    var Core;
    (function (Core) {
        var Server;
        (function (Server) {
            class WebSocketClientListService {
                constructor(entityFactory) {
                    this.entityFactory = entityFactory;
                    this.lastSocketClientId = 0;
                    this.webSocketClientList = new Map();
                }
                addWebSocketClient(client) {
                    let newClientId = this.getNewSocketClientId();
                    let webSocketClient = new Server.WebSocketClient(this.entityFactory, newClientId, client);
                    this.webSocketClientList.set(newClientId, webSocketClient);
                    return webSocketClient;
                }
                getWebSocketClientListIterator() {
                    return this.webSocketClientList.values();
                }
                getNewSocketClientId() {
                    this.lastSocketClientId += 1;
                    return this.lastSocketClientId;
                }
                close() {
                }
            }
            Server.WebSocketClientListService = WebSocketClientListService;
        })(Server = Core.Server || (Core.Server = {}));
    })(Core = Estella.Core || (Estella.Core = {}));
})(Estella || (Estella = {}));
var Estella;
(function (Estella) {
    var Core;
    (function (Core) {
        var Server;
        (function (Server) {
            class WebSocketGameServer {
                constructor(server, engine) {
                    this.webSocketServer = new Server.WebSocketServer(server, engine.getWorld().getEntityFactory());
                    this.engine = engine;
                    this.init();
                }
                init() {
                    this.gameServer = new Core.GameServer(this.engine);
                    this.gameServer.setOnUpdateWorld(this.onUpdateWorld.bind(this));
                    this.webSocketServer.setOnClientConnected(this.onClientConnected.bind(this));
                    this.webSocketServer.setOnClientMessage(this.onClientMessage.bind(this));
                }
                onUpdateWorld(world, currentStepNumber, commandList) {
                    /*let messageWorldFullInfo = new ClientServerMessageWorldFullInfo();
                    messageWorldFullInfo.setWorld(this.engine.getWorld());
        
                    this.webSocketServer.sendAll(messageWorldFullInfo);*/
                    let message = this.createStepMessage(currentStepNumber, commandList);
                    this.webSocketServer.sendAll(message);
                }
                createStepMessage(currentStepNumber, commandList) {
                    let message = new Core.ClientServerMessageStep();
                    message.setStepNumber(currentStepNumber);
                    message.setCommandList(commandList);
                    return message;
                }
                onClientConnected(client) {
                    let clientId = this.getClientIdBySID(client.getSID());
                    client.setClientId(clientId);
                    let messageInit = new Core.ClientServerMessageInit();
                    messageInit.setClientId(clientId);
                    client.sendMessage(messageInit);
                    let messageWorldFullInfo = new Core.ClientServerMessageWorldFullInfo();
                    messageWorldFullInfo.setWorld(this.engine.getWorld());
                    client.sendMessage(messageWorldFullInfo);
                    /*let stepList: ClientServerMessageStep[] = [];
                    let commandLog = this.gameServer.getCommandLog(0);
                    for (let commandList of commandLog) {
                        let message = this.createStepMessage(0, commandList);
                        stepList.push(message);
                    }
        
                    let messageStepList = new ClientServerMessageStepList();
                    messageStepList.setStepList(stepList);
                    client.sendMessage(messageStepList);*/
                }
                onClientMessage(webSocketClient, message) {
                    if (message instanceof Core.ClientServerMessageCommandList) {
                        this.processCommandList(webSocketClient, message);
                    }
                }
                processCommandList(webSocketClient, message) {
                    let commandList = this.engine.getWorld().getEntityFactory().restoreList(message.getCommandList(), Core.Command);
                    this.engine.getCommandListService().setCommandList(this.initCommandList(webSocketClient, commandList));
                }
                *initCommandList(webSocketClient, commandList) {
                    var clientId = webSocketClient.getClientId();
                    for (let command of commandList) {
                        command.setInitiatorId(clientId);
                        yield command;
                    }
                }
                start() {
                    this.gameServer.start();
                }
            }
            Server.WebSocketGameServer = WebSocketGameServer;
        })(Server = Core.Server || (Core.Server = {}));
    })(Core = Estella.Core || (Estella.Core = {}));
})(Estella || (Estella = {}));
var Estella;
(function (Estella) {
    var Core;
    (function (Core) {
        var Server;
        (function (Server) {
            class WebSocketServer {
                constructor(server, entityFactory) {
                    this.entityFactory = entityFactory;
                    this.webSocketClientListService = new Server.WebSocketClientListService(entityFactory);
                    this.server = server;
                    this.init();
                }
                init() {
                    this.server.on('connection', this.onConnection.bind(this));
                }
                sendAll(message) {
                    let webSocketClientList = this.webSocketClientListService.getWebSocketClientListIterator();
                    for (let webSocketClient of webSocketClientList) {
                        if (webSocketClient.getStatus() == Server.WebSocketClientStatus.Connected) {
                            webSocketClient.sendMessage(message);
                        }
                    }
                }
                setOnClientConnected(handler) {
                    this.onClientConnectedHandler = handler;
                }
                setOnClientMessage(handler) {
                    this.onClientMessageHandler = handler;
                }
                setOnClientDisconnected(handler) {
                    this.onClientDisconnectedHandler = handler;
                }
                onConnection(client) {
                    let webSocketClient = this.webSocketClientListService.addWebSocketClient(client);
                    this.initWebSocketClient(webSocketClient);
                }
                initWebSocketClient(webSocketClient) {
                    webSocketClient.afterMessage().on(this.onClientMessage.bind(this));
                    //webSocketClient.setOnMessage(this.onClientMessage.bind(this));
                    //webSocketClient.setOnClose(this.onClientDisconnected.bind(this));
                    //this.entityFactory.create
                    let message = new Core.ClientServerMessageRequestAuthentication();
                    webSocketClient.sendMessage(message);
                }
                onClientMessage(ev) {
                    /*if (webSocketClient.getStatus() === WebSocketClientStatus.Initialization && message instanceof ClientServerMessageResponseAuthentication) {
                        this.doAuthentication(webSocketClient, message);
                    } else if (this.onClientMessageHandler) {
                        this.onClientMessageHandler(webSocketClient, message);
                    }*/
                }
                onClientDisconnected(webSocketClient) {
                    webSocketClient.setStatus(Server.WebSocketClientStatus.Disconnected);
                }
                doAuthentication(webSocketClient, message) {
                    /*let sid = message.getSID();
                    console.log("Client connected. SID:" + sid);
                    webSocketClient.setSID(sid);
                    this.onClientConnected(webSocketClient);*/
                }
                onClientConnected(ev) {
                    /*webSocketClient.setStatus(WebSocketClientStatus.Connected);
                    if (this.onClientConnectedHandler) {
                        this.onClientConnectedHandler(webSocketClient);
                    }*/
                }
                close() {
                }
            }
            Server.WebSocketServer = WebSocketServer;
        })(Server = Core.Server || (Core.Server = {}));
    })(Core = Estella.Core || (Estella.Core = {}));
})(Estella || (Estella = {}));
