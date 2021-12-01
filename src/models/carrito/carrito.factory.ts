import { CarritoFSDAO } from './DAOs/carrito_fs';
import { CarritoMYSQLDAO } from './DAOs/carrito_mysql';
import { CarritoSQLITE3DAO } from './DAOs/carrito_sqlite3';
// import { CarritoLOCALMONGODAO } from "./DAOs/carrito_mongolocal";
import { CarritoATLASMONGODAO } from "./DAOs/carrito_mongoatlas";
// import { CarritoFIREBASEDAO } from './DAOs/carrito_firebaseDB';
import { CarritoMemDAO } from './DAOs/carrito_memory';
import { TipoPersistencia } from '../products/products.factory';
import path from 'path';

export class CarritoFactoryDAO {
  static get(tipo: TipoPersistencia) {
    switch (tipo) {
      case TipoPersistencia.FileSystem:
        console.log('RETORNANDO INSTANCIA CLASE CARRITO FS');
        const filePath = path.resolve(__dirname, './DAOs/carrito.json');
        return CarritoFSDAO.getInstance(filePath);

      case TipoPersistencia.MYSQL:
        console.log('RETORNANDO INSTANCIA CLASE CARRITO MYSQL');
        return CarritoMYSQLDAO.getInstance();

      case TipoPersistencia.SQLITE3:
        console.log('RETORNANDO INSTANCIA CLASE CARRITO SQLITE3');
        return CarritoSQLITE3DAO.getInstance();

    //   case TipoPersistencia.LocalMongo:
    //     console.log('RETORNANDO INSTANCIA CLASE CARRITO MONGO LOCAL');
    //     return CarritoLOCALMONGODAO.getInstance();

      case TipoPersistencia.MongoAtlas:
        console.log('RETORNANDO INSTANCIA CLASE CARRITO MONGO ATLAS');
        return CarritoATLASMONGODAO.getInstance();
      
    //   case TipoPersistencia.Firebase:
    //     console.log('RETORNANDO INSTANCIA CLASE CARRITO FIREBASE');
    //     return CarritoFIREBASEDAO.getInstance();
        
      default:
        console.log('RETORNANDO INSTANCIA CLASE CARRITO MEMORIA');
        // return CarritoMemDAO.getInstance();
    }
  }
}
