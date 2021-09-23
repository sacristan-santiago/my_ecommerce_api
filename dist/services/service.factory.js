"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.serverInit = void 0;
const products_factory_1 = require("../models/products/products.factory");
const mysqlDB_1 = require("./mysqlDB");
const mongooseDB_1 = require("./mongooseDB");
const atlasDB_1 = require("./atlasDB");
const firebaseDB_1 = require("./firebaseDB");
function serverInit(tipo) {
    switch (tipo) {
        case products_factory_1.TipoPersistencia.FileSystem:
            break;
        case products_factory_1.TipoPersistencia.MYSQL:
            mysqlDB_1.mysqlDBService.init();
            break;
        case products_factory_1.TipoPersistencia.SQLITE3:
            mysqlDB_1.mysqlDBService.init();
            break;
        case products_factory_1.TipoPersistencia.LocalMongo:
            mongooseDB_1.mongooseService.init();
            break;
        case products_factory_1.TipoPersistencia.MongoAtlas:
            atlasDB_1.altasService.init();
            break;
        case products_factory_1.TipoPersistencia.Firebase:
            firebaseDB_1.firebaseService.init();
            break;
        default:
            break;
    }
}
exports.serverInit = serverInit;
