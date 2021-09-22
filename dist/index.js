"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const server_1 = __importDefault(require("./services/server"));
const firebaseDB_1 = require("./services/firebaseDB");
const puerto = process.env.PORT || 8080;
// Inicio Database MySQL
// mysqlDBService.init();
//Inicio server HTTP
server_1.default.listen(puerto, () => console.log(`Server up en puerto ${puerto}`));
//Inicio Websocket server
// const myWSServer = socketService.initWsService(myHTTPServer);
//Inicio mongooseDB
// mongooseService.init();
//Inicio mongooseDB
// altasService.init();
//Inicio firebaseDB
firebaseDB_1.firebaseService.init();
