"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.modo = exports.puerto = void 0;
const config_1 = __importDefault(require("./config"));
const server_1 = __importDefault(require("./services/server"));
const cluster_1 = __importDefault(require("cluster"));
const os_1 = __importDefault(require("os"));
const logger_1 = require("./services/logger/logger");
const parametros = process.argv.slice(2);
exports.puerto = config_1.default.PORT;
exports.modo = "FORK";
if (parametros.length > 0) {
    exports.puerto = Number(parametros[0]);
    (parametros.length > 1) ? exports.modo = parametros[1] : "";
}
//Obtengo el numero de nucleos disponibles en mi PC
const numCPUs = os_1.default.cpus().length;
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
    /* WORKERS */
    server_1.default.listen(exports.puerto, () => logger_1.logger.info(`Servidor express escuchando en el puerto ${exports.puerto} - PID WORKER ${process.pid}`));
}
// Writing some test logs
logger_1.logger.warn('WARNING 1');
logger_1.logger.error('ERROR 1');
logger_1.logger.info('INFO 1');
//Inicio server HTTP comun (sin modulo cluster)
// myHTTPServer.listen(puerto, () => console.log(`Server up en puerto ${puerto}`));
//Inicio Websocket server
// socketService.initWsService(myHTTPServer);
//Inicio server segun persistencia
// serverInit(tipoPersistencia);
