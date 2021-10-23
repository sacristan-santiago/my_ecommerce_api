"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.modo = void 0;
const config_1 = __importDefault(require("./config"));
const server_1 = __importDefault(require("./services/server"));
const cluster_1 = __importDefault(require("cluster"));
const os_1 = __importDefault(require("os"));
const parametros = process.argv.slice(2);
let puerto = config_1.default.PORT;
exports.modo = "FORK";
if (parametros.length > 0) {
    puerto = Number(parametros[0]);
    (parametros.length > 1) ? exports.modo = parametros[1] : "";
}
//Obtengo el numero de nucleos disponibles en mi PC
const numCPUs = os_1.default.cpus().length;
/* --------------------------------------------------------------------------- */
/* MASTER */
/**
 * isMaster vs isPrimary
 * https://stackoverflow.com/questions/68978929/why-is-nodejs-cluster-module-not-working
 */
// console.log("master", cluster.isMaster)
// console.log("cluster", (modo === "CLUSTER"))
if (cluster_1.default.isMaster && (exports.modo === "CLUSTER")) {
    console.log(`NUMERO DE CPUS ===> ${numCPUs}`);
    console.log(`PID MASTER ${process.pid}`);
    for (let i = 0; i < numCPUs; i++) {
        cluster_1.default.fork();
    }
    cluster_1.default.on('exit', (worker) => {
        console.log(`Worker ${worker.process.pid} died at ${Date()}`);
        cluster_1.default.fork();
    });
}
else {
    /* --------------------------------------------------------------------------- */
    /* WORKERS */
    server_1.default.listen(puerto, () => console.log(`Servidor express escuchando en el puerto ${puerto} - PID WORKER ${process.pid}`));
}
//Inicio server HTTP comun (sin modulo cluster)
// myHTTPServer.listen(puerto, () => console.log(`Server up en puerto ${puerto}`));
//Inicio Websocket server
// socketService.initWsService(myHTTPServer);
//Inicio server segun persistencia
// serverInit(tipoPersistencia);
