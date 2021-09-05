import myHTTPServer from "./services/server";
import { DBService } from "./services/db";
import { socketService } from "./services/socket";

const  puerto = process.env.PORT || 8080; 

//Inicio Databases
DBService.init();

//Inicio server HTTP
myHTTPServer.listen(puerto, () => console.log(`Server up en puerto ${puerto}`));

//Inicio Websocket server
const myWSServer = socketService.initWsService(myHTTPServer);