"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsuariosFactoryDAO = void 0;
// import { CarritoFSDAO } from './DAOs/carrito_fs';
// import { CarritoMYSQLDAO } from './DAOs/carrito_mysql';
// import { CarritoSQLITE3DAO } from './DAOs/carrito_sqlite3';
// import { CarritoLOCALMONGODAO } from "./DAOs/carrito_mongolocal";
const usuarios_mongoatlas_1 = require("./DAOs/usuarios_mongoatlas");
// import { CarritoFIREBASEDAO } from './DAOs/carrito_firebaseDB';
// import { CarritoMemDAO } from './DAOs/carrito_memory';
const products_factory_1 = require("../products/products.factory");
class UsuariosFactoryDAO {
    static get(tipo) {
        switch (tipo) {
            //   case TipoPersistencia.FileSystem:
            //     console.log('RETORNANDO INSTANCIA CLASE CARRITO FS');
            //     const filePath = path.resolve(__dirname, './DAOs/carrito.json');
            //     return new CarritoFSDAO(filePath);
            //   case TipoPersistencia.MYSQL:
            //     console.log('RETORNANDO INSTANCIA CLASE CARRITO MYSQL');
            //     return new CarritoMYSQLDAO;
            //   case TipoPersistencia.SQLITE3:
            //     console.log('RETORNANDO INSTANCIA CLASE CARRITO SQLITE3');
            //     return new CarritoSQLITE3DAO;
            //   case TipoPersistencia.LocalMongo:
            //     console.log('RETORNANDO INSTANCIA CLASE CARRITO MONGO LOCAL');
            //     return new CarritoLOCALMONGODAO;
            case products_factory_1.TipoPersistencia.MongoAtlas:
                console.log('RETORNANDO INSTANCIA CLASE CARRITO MONGO ATLAS');
                return new usuarios_mongoatlas_1.UsuariosATLASMONGODAO;
            //   case TipoPersistencia.Firebase:
            //     console.log('RETORNANDO INSTANCIA CLASE CARRITO FIREBASE');
            //     return new CarritoFIREBASEDAO;
            default:
                console.log('RETORNANDO INSTANCIA CLASE CARRITO MEMORIA');
            // return new UsuariosMemDAO();
        }
    }
}
exports.UsuariosFactoryDAO = UsuariosFactoryDAO;
