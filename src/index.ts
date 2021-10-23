import Config from "./config";
import myHTTPServer from "./services/server";
import { socketService } from "./services/socket";
import { serverInit } from "./services/service.factory";
import { tipoPersistencia } from "./apis/productos";
import cluster from "cluster";
import os from "os";

const parametros = process.argv.slice(2)

let puerto = Config.PORT;
export let modo = "FORK"

if (parametros.length > 0) {
    puerto = Number(parametros[0]);
    (parametros.length > 1) ? modo = parametros[1] : ""; 
}

//Obtengo el numero de nucleos disponibles en mi PC
const numCPUs = os.cpus().length;

/* --------------------------------------------------------------------------- */
/* MASTER */
/**
 * isMaster vs isPrimary
 * https://stackoverflow.com/questions/68978929/why-is-nodejs-cluster-module-not-working
 */
// console.log("master", cluster.isMaster)
// console.log("cluster", (modo === "CLUSTER"))
if (cluster.isMaster && (modo === "CLUSTER")) {
  console.log(`NUMERO DE CPUS ===> ${numCPUs}`);
  console.log(`PID MASTER ${process.pid}`);

  for (let i = 0; i < numCPUs; i++) {
    cluster.fork();
  }

  cluster.on('exit', (worker) => {
    console.log(`Worker ${worker.process.pid} died at ${Date()}`);
    cluster.fork();
  });
} else {
  /* --------------------------------------------------------------------------- */
  /* WORKERS */
  myHTTPServer.listen(puerto, () =>
    console.log(
      `Servidor express escuchando en el puerto ${puerto} - PID WORKER ${process.pid}`
    )
  );
}

//Inicio server HTTP comun (sin modulo cluster)
// myHTTPServer.listen(puerto, () => console.log(`Server up en puerto ${puerto}`));

//Inicio Websocket server
// socketService.initWsService(myHTTPServer);

//Inicio server segun persistencia
// serverInit(tipoPersistencia);