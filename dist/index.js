"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = __importDefault(require("./config"));
const server_1 = __importDefault(require("./services/server"));
const socket_1 = require("./services/socket");
const service_factory_1 = require("./services/service.factory");
const productos_1 = require("./apis/productos");
const parametros = process.argv.slice(2);
let puerto = config_1.default.PORT;
if (parametros.length != 0) {
    puerto = Number(parametros[0]);
}
//Inicio server HTTP
server_1.default.listen(puerto, () => console.log(`Server up en puerto ${puerto}`));
//Inicio Websocket server
socket_1.socketService.initWsService(server_1.default);
//Inicio server segun persistencia
service_factory_1.serverInit(productos_1.tipoPersistencia);
