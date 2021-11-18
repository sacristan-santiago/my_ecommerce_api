"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const server_1 = require("./services/server");
const socket_1 = require("./services/socket");
const service_factory_1 = require("./services/service.factory");
const productos_1 = require("./apis/productos");
const cluster_1 = __importDefault(require("./services/cluster"));
//Inicio server HTTP in CLUSTER OR FORK MODE
cluster_1.default();
//Inicio Websocket server
socket_1.socketService.initWsService(server_1.myHTTPServer);
//Inicio server segun persistencia
service_factory_1.serverInit(productos_1.tipoPersistencia);
