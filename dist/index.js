"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const server_1 = __importDefault(require("./services/server"));
const socket_1 = require("./services/socket");
const mongooseDB_1 = require("./services/mongooseDB");
const puerto = process.env.PORT || 8080;
//Inicio Databases
// DBService.init();
//Inicio server HTTP
server_1.default.listen(puerto, () => console.log(`Server up en puerto ${puerto}`));
//Inicio Websocket server
const myWSServer = socket_1.socketService.initWsService(server_1.default);
//Inicio mongooseDB
mongooseDB_1.mongooseService.init();
