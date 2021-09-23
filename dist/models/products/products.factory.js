"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductosFactoryDAO = exports.TipoPersistencia = void 0;
const productos_fs_1 = require("./DAOs/productos_fs");
const productos_mysql_1 = require("./DAOs/productos_mysql");
const productos_sqlite3_1 = require("./DAOs/productos_sqlite3");
const productos_mongolocal_1 = require("./DAOs/productos_mongolocal");
const productos_mongoatlas_1 = require("./DAOs/productos_mongoatlas");
const productos_firebaseDB_1 = require("./DAOs/productos_firebaseDB");
const productos_memory_1 = require("./DAOs/productos_memory");
const path_1 = __importDefault(require("path"));
var TipoPersistencia;
(function (TipoPersistencia) {
    TipoPersistencia["Memoria"] = "MEM";
    TipoPersistencia["FileSystem"] = "FS";
    TipoPersistencia["MYSQL"] = "MYSQL";
    TipoPersistencia["SQLITE3"] = "SQLITE3";
    TipoPersistencia["LocalMongo"] = "LOCAL-MONGO";
    TipoPersistencia["MongoAtlas"] = "MONGO-ATLAS";
    TipoPersistencia["Firebase"] = "FIREBASE";
})(TipoPersistencia = exports.TipoPersistencia || (exports.TipoPersistencia = {}));
class ProductosFactoryDAO {
    static get(tipo) {
        switch (tipo) {
            case TipoPersistencia.FileSystem:
                console.log('RETORNANDO INSTANCIA CLASE PRODUCTOS FS');
                const filePath = path_1.default.resolve(__dirname, './DAOs/productos.json');
                return new productos_fs_1.ProductosFSDAO(filePath);
            case TipoPersistencia.MYSQL:
                console.log('RETORNANDO INSTANCIA CLASE PRODUCTOS MYSQL');
                return new productos_mysql_1.ProductosMYSQLDAO;
            case TipoPersistencia.SQLITE3:
                console.log('RETORNANDO INSTANCIA CLASE PRODUCTOS SQLITE3');
                return new productos_sqlite3_1.ProductosSQLITE3DAO;
            case TipoPersistencia.LocalMongo:
                console.log('RETORNANDO INSTANCIA CLASE PRODUCTOS MONGO LOCAL');
                return new productos_mongolocal_1.ProductosLOCALMONGODAO;
            case TipoPersistencia.MongoAtlas:
                console.log('RETORNANDO INSTANCIA CLASE PRODUCTOS MONGO ATLAS');
                return new productos_mongoatlas_1.ProductosATLASMONGODAO;
            case TipoPersistencia.Firebase:
                console.log('RETORNANDO INSTANCIA CLASE PRODUCTOS FIREBASE');
                return new productos_firebaseDB_1.ProductosFIREBASEDAO;
            default:
                console.log('RETORNANDO INSTANCIA CLASE PRODUCTOS MEMORIA');
                return new productos_memory_1.ProductosMemDAO();
        }
    }
}
exports.ProductosFactoryDAO = ProductosFactoryDAO;
