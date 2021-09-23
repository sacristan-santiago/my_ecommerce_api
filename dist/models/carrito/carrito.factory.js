"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CarritoFactoryDAO = void 0;
const carrito_fs_1 = require("./DAOs/carrito_fs");
const carrito_mysql_1 = require("./DAOs/carrito_mysql");
const carrito_sqlite3_1 = require("./DAOs/carrito_sqlite3");
// import { CarritoLOCALMONGODAO } from "./DAOs/carrito_mongolocal";
// import { CarritoATLASMONGODAO } from "./DAOs/carrito_mongoatlas";
// import { CarritoFIREBASEDAO } from './DAOs/carrito_firebaseDB';
const carrito_memory_1 = require("./DAOs/carrito_memory");
const products_factory_1 = require("../products/products.factory");
const path_1 = __importDefault(require("path"));
class CarritoFactoryDAO {
    static get(tipo) {
        switch (tipo) {
            case products_factory_1.TipoPersistencia.FileSystem:
                console.log('RETORNANDO INSTANCIA CLASE CARRITO FS');
                const filePath = path_1.default.resolve(__dirname, './DAOs/carrito.json');
                return new carrito_fs_1.CarritoFSDAO(filePath);
            case products_factory_1.TipoPersistencia.MYSQL:
                console.log('RETORNANDO INSTANCIA CLASE CARRITO MYSQL');
                return new carrito_mysql_1.CarritoMYSQLDAO;
            case products_factory_1.TipoPersistencia.SQLITE3:
                console.log('RETORNANDO INSTANCIA CLASE CARRITO SQLITE3');
                return new carrito_sqlite3_1.CarritoSQLITE3DAO;
            //   case TipoPersistencia.LocalMongo:
            //     console.log('RETORNANDO INSTANCIA CLASE CARRITO MONGO LOCAL');
            //     return new CarritoLOCALMONGODAO;
            //   case TipoPersistencia.MongoAtlas:
            //     console.log('RETORNANDO INSTANCIA CLASE CARRITO MONGO ATLAS');
            //     return new CarritoATLASMONGODAO;
            //   case TipoPersistencia.Firebase:
            //     console.log('RETORNANDO INSTANCIA CLASE CARRITO FIREBASE');
            //     return new CarritoFIREBASEDAO;
            default:
                console.log('RETORNANDO INSTANCIA CLASE CARRITO MEMORIA');
                return new carrito_memory_1.CarritoMemDAO();
        }
    }
}
exports.CarritoFactoryDAO = CarritoFactoryDAO;
