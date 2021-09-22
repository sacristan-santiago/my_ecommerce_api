import myHTTPServer from "./services/server";
import { mysqlDBService } from "./services/mysqlDB";
import { socketService } from "./services/socket";
import { mongooseService } from "./services/mongooseDB";
import { altasService } from "./services/atlasDB";
import { firebaseService } from "./services/firebaseDB";


const  puerto = process.env.PORT || 8080; 

// Inicio Database MySQL
// mysqlDBService.init();

//Inicio server HTTP
myHTTPServer.listen(puerto, () => console.log(`Server up en puerto ${puerto}`));

//Inicio Websocket server
// const myWSServer = socketService.initWsService(myHTTPServer);

//Inicio mongooseDB
// mongooseService.init();

//Inicio mongooseDB
// altasService.init();

//Inicio firebaseDB
firebaseService.init();