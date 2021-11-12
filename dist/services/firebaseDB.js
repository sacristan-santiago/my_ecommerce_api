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
exports.firebaseService = void 0;
var admin = require("firebase-admin");
// var serviceAccount = require("./firebase.json");
const config_1 = __importDefault(require("../config"));
class firebaseDB {
    init() {
        return __awaiter(this, void 0, void 0, function* () {
            admin.initializeApp({
                credential: admin.credential.cert({
                    privateKey: config_1.default.FIREBASE_PRIVATEKEY,
                    projectId: config_1.default.FIREBASE_PROJECTID,
                    clientEmail: config_1.default.FIREBASE_CLIENTEMAIL
                })
            });
            const firebaseDB = admin.firestore();
            const productsCollection = yield firebaseDB.collection("productos").get();
            if ((productsCollection.empty)) {
                const products = [
                    {
                        timestamp: new Date,
                        nombre: "PRODUCTO 1",
                        descripcion: "descripcion 1",
                        codigo: "ASD123",
                        foto: "URL1",
                        precio: 10.23,
                        stock: 10
                    },
                    {
                        timestamp: new Date,
                        nombre: "PRODUCTO 2",
                        descripcion: "descripcion 2",
                        codigo: "ASD234",
                        foto: "URL2",
                        precio: 10.23,
                        stock: 10
                    },
                    {
                        timestamp: new Date,
                        nombre: "PRODUCTO 3",
                        descripcion: "descripcion 3",
                        codigo: "ASD345",
                        foto: "URL3",
                        precio: 10.23,
                        stock: 10
                    },
                    {
                        timestamp: new Date,
                        nombre: "PRODUCTO 4",
                        descripcion: "descripcion 4",
                        codigo: "ASD456",
                        foto: "URL4",
                        precio: 10.23,
                        stock: 10
                    }
                ];
                //Agrego varios documentos al mismo tiempo
                const batch = firebaseDB.batch();
                products.forEach((doc) => {
                    const docRef = firebaseDB.collection("productos").doc();
                    batch.set(docRef, doc);
                });
                batch.commit();
                console.log("se crea firebase collection productos!");
            }
        });
    }
}
exports.firebaseService = new firebaseDB;
