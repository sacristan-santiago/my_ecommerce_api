// import { CarritoFSDAO } from './DAOs/carrito_fs';
// import { CarritoMYSQLDAO } from './DAOs/carrito_mysql';
// import { CarritoSQLITE3DAO } from './DAOs/carrito_sqlite3';
// import { CarritoLOCALMONGODAO } from "./DAOs/carrito_mongolocal";
import { UsuariosATLASMONGODAO } from "./DAOs/usuarios_mongoatlas";
// import { CarritoFIREBASEDAO } from './DAOs/carrito_firebaseDB';
// import { CarritoMemDAO } from './DAOs/carrito_memory';
import { TipoPersistencia } from '../products/products.factory';
import path from 'path';

export class UsuariosFactoryDAO {
  static get(tipo: TipoPersistencia) {
    switch (tipo) {
    //   case TipoPersistencia.FileSystem:
    //     console.log('RETORNANDO INSTANCIA CLASE USUARIOS FS');
    //     const filePath = path.resolve(__dirname, './DAOs/carrito.json');
    //     return new CarritoFSDAO(filePath);

    //   case TipoPersistencia.MYSQL:
    //     console.log('RETORNANDO INSTANCIA CLASE USUARIOS MYSQL');
    //     return new CarritoMYSQLDAO;

    //   case TipoPersistencia.SQLITE3:
    //     console.log('RETORNANDO INSTANCIA CLASE USUARIOS SQLITE3');
    //     return new CarritoSQLITE3DAO;

    //   case TipoPersistencia.LocalMongo:
    //     console.log('RETORNANDO INSTANCIA CLASE USUARIOS MONGO LOCAL');
    //     return new CarritoLOCALMONGODAO;

      case TipoPersistencia.MongoAtlas:
        console.log('RETORNANDO INSTANCIA CLASE USUARIOS MONGO ATLAS');
        return new UsuariosATLASMONGODAO;
      
    //   case TipoPersistencia.Firebase:
    //     console.log('RETORNANDO INSTANCIA CLASE USUARIOS FIREBASE');
    //     return new CarritoFIREBASEDAO;
        
      default:
        console.log('RETORNANDO INSTANCIA CLASE USUARIOS MEMORIA');
        // return new UsuariosMemDAO();
    }
  }
}
