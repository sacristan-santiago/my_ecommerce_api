import Config from "./config";
import { myHTTPServer } from "./services/server";
import expressServer from "./services/server";
import { socketService } from "./services/socket";
import { serverInit } from "./services/service.factory";
import { tipoPersistencia } from "./apis/productos";
import initiateHTTP from "./services/cluster";

//Inicio server HTTP in CLUSTER OR FORK MODE
initiateHTTP();

//Inicio Websocket server
socketService.initWsService(myHTTPServer);

//Inicio server segun persistencia
serverInit(tipoPersistencia);