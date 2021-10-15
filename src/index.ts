import Config from "./config";
import myHTTPServer from "./services/server";
import { socketService } from "./services/socket";
import { serverInit } from "./services/service.factory";
import { tipoPersistencia } from "./apis/productos";

const parametros = process.argv.slice(2)

let puerto = Config.PORT;

if (parametros.length != 0) {
    puerto = Number(parametros[0])
} 
 

//Inicio server HTTP
myHTTPServer.listen(puerto, () => console.log(`Server up en puerto ${puerto}`));

//Inicio Websocket server
socketService.initWsService(myHTTPServer);

//Inicio server segun persistencia
serverInit(tipoPersistencia);