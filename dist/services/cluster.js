"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cluster_1 = __importDefault(require("cluster"));
const config_1 = __importDefault(require("../config"));
const os_1 = __importDefault(require("os"));
const logger_1 = require("../services/logger/logger");
const server_1 = __importDefault(require("./server"));
const initiateHTTP = () => {
    let modo;
    (process.argv[3]) ? modo = process.argv[3] : modo = config_1.default.SERVER_MODE;
    const numCPUs = os_1.default.cpus().length; //Obtengo el numero de nucleos disponibles en mi PC
    if (cluster_1.default.isMaster && (modo.toUpperCase() === "CLUSTER")) {
        logger_1.logger.info(`NUMERO DE CPUS ===> ${numCPUs}`);
        logger_1.logger.info(`PID MASTER ${process.pid}`);
        for (let i = 0; i < numCPUs; i++) {
            cluster_1.default.fork();
        }
        cluster_1.default.on('exit', (worker) => {
            logger_1.logger.info(`Worker ${worker.process.pid} died at ${Date()}`);
            cluster_1.default.fork();
        });
    }
    else {
        /* WORKERS */
        let port;
        (process.argv[2]) ? port = process.argv[2] : port = config_1.default.PORT;
        server_1.default.listen(port, () => logger_1.logger.info(`Servidor graphQL escuchando en el puerto ${port} - PID WORKER ${process.pid}`));
    }
};
exports.default = initiateHTTP;
