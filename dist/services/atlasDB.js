"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.altasService = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const productos_1 = require("../schemas/productos");
const counters_1 = require("../schemas/counters");
const config_1 = __importDefault(require("../config"));
class atlasDB {
    init() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const usuario = config_1.default.MONGO_ATLAS_USER;
                const password = config_1.default.MONGO_ATLAS_PASSWORD;
                const dbName = config_1.default.MONGO_ATLAS_DBNAME;
                const clusterUrl = config_1.default.MONGO_ATLAS_CLUSTER;
                const myURI = `mongodb+srv://${usuario}:${password}@${clusterUrl}/${dbName}?retryWrites=true&w=majority`;
                /******************PRODUCTOS DB******************/
                const products = [
                    {
                        uID: 1,
                        timestamp: new Date,
                        nombre: "PRODUCTO 1",
                        descripcion: "descripcion 1",
                        codigo: "ASD123",
                        foto: "URL1",
                        precio: 10.23,
                        stock: 10
                    },
                    {
                        uID: 2,
                        timestamp: new Date,
                        nombre: "PRODUCTO 2",
                        descripcion: "descripcion 2",
                        codigo: "ASD234",
                        foto: "URL2",
                        precio: 10.23,
                        stock: 10
                    },
                    {
                        uID: 3,
                        timestamp: new Date,
                        nombre: "PRODUCTO 3",
                        descripcion: "descripcion 3",
                        codigo: "ASD345",
                        foto: "URL3",
                        precio: 10.23,
                        stock: 10
                    },
                    {
                        uID: 4,
                        timestamp: new Date,
                        nombre: "PRODUCTO 4",
                        descripcion: "descripcion 4",
                        codigo: "ASD456",
                        foto: "URL4",
                        precio: 10.23,
                        stock: 10
                    }
                ];
                yield mongoose_1.default.connect(myURI);
                // await productosmodel.collection.drop();
                // await countersmodel.collection.drop();
                //Create collection
                if (!(yield productos_1.productosmodel.exists({}))) {
                    yield productos_1.productosmodel.insertMany(products);
                    const productosCounter = {
                        _id: "productos counter identifier",
                        count: 4,
                        notes: "Increment COUNT using findAndModify to ensure that the COUNT field will be incremented atomically with the fetch of this document",
                    };
                    yield new counters_1.countersmodel(productosCounter).save();
                }
            }
            catch (e) {
                console.log("Error: ", e);
            }
        });
    }
}
exports.altasService = new atlasDB;
