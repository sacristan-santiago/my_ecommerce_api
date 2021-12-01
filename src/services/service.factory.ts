import { TipoPersistencia } from "../models/products/products.factory";
import { mysqlDBService } from "./mysqlDB";
import { mongooseService } from "./mongooseDB";
import { altasService } from "./atlasDB";
import { firebaseService } from "./firebaseDB";

export function serverInit (tipo: TipoPersistencia) {
    switch (tipo) {
        case TipoPersistencia.FileSystem:
            break;
    
        case TipoPersistencia.MYSQL:
            mysqlDBService.init();
            break;

        case TipoPersistencia.SQLITE3:
            mysqlDBService.init();
            break;
    
        case TipoPersistencia.LocalMongo:
            mongooseService.init();
            break;
    
        case TipoPersistencia.MongoAtlas:
            altasService.init();
            break;

        case TipoPersistencia.MongoAtlas_extended:
            altasService.init();
            break;
        
        case TipoPersistencia.Firebase:
            firebaseService.init();
            break
        default: 
            break;
      }
}