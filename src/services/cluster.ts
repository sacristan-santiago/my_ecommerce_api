import cluster from "cluster";
import Config from "../config"
import os from "os";
import { logger } from "../services/logger/logger"
import expressServer from "./server";

const initiateHTTP = () => {
    let modo: any
    (process.argv[3]) ? modo = process.argv[3] : Config.SERVER_MODE
    const numCPUs = os.cpus().length //Obtengo el numero de nucleos disponibles en mi PC

    if (cluster.isMaster && (modo.toUpperCase() === "CLUSTER")) {
        logger.info(`NUMERO DE CPUS ===> ${numCPUs}`);
        logger.info(`PID MASTER ${process.pid}`);

        for (let i = 0; i < numCPUs; i++) {
            cluster.fork();
        }

        cluster.on('exit', (worker) => {
            logger.info(`Worker ${worker.process.pid} died at ${Date()}`);
            cluster.fork();
        });
    } else {
    /* WORKERS */
    let port:any;
    (process.argv[2]) ? port = process.argv[2] : Config.PORT
    expressServer.listen(port, () =>
        logger.info(`Servidor express escuchando en el puerto ${port} - PID WORKER ${process.pid}`)
    );
    }
}

export default initiateHTTP;