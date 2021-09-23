import Config from "./config";
import myHTTPServer from "./services/server";
import { socketService } from "./services/socket";
import { serverInit } from "./services/service.factory";
import { tipoPersistencia } from "./apis/productos";


const  puerto = Config.PORT; 

//Inicio server HTTP
myHTTPServer.listen(puerto, () => console.log(`Server up en puerto ${puerto}`));

//Inicio Websocket server
socketService.initWsService(myHTTPServer);

//Inicio server segun persistencia
serverInit(tipoPersistencia);