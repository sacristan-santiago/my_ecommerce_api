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
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductosFIREBASEDAO = void 0;
var admin = require("firebase-admin");
const productos_1 = require("../../../utils/productos");
class ProductosFIREBASEDAO {
    get(_id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const firebaseDB = admin.firestore();
                if (_id) {
                    let resultado = yield firebaseDB.collection("productos").doc(_id).get();
                    if (resultado.exists) {
                        const data = resultado.data();
                        data.id = resultado.id;
                        return productos_1.dataOrdered(data);
                    }
                    return;
                }
                let resultado = yield firebaseDB.collection("productos").get();
                let docs = resultado.docs;
                const output = docs.map((aDoc) => {
                    const data = aDoc.data();
                    data.id = aDoc.id;
                    return productos_1.dataOrdered(data);
                });
                return output;
            }
            catch (err) {
                console.log("ERROR");
                console.log(err);
            }
        });
    }
    add(data) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const firebaseDB = admin.firestore();
                const UserDocument = firebaseDB.collection("productos").doc();
                yield UserDocument.create(data); //vamos a crear un documento cuya key sea (algo generico)
                //a ese documento le metemos data en formato json
                console.log("Se creo un nuevo documento!");
            }
            catch (err) {
                console.log("ERROR");
                console.log(err);
            }
        });
    }
    update(id, data) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const firebaseDB = admin.firestore();
                const UserDocument = firebaseDB.collection("productos").doc(id);
                yield UserDocument.update(data); //vamos a crear un documento cuya key sea (algo generico)
                //a ese documento le metemos data en formato json
                console.log("Se actualizo un documento!");
                return this.get(id);
            }
            catch (err) {
                console.log("ERROR");
                console.log(err);
            }
        });
    }
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const firebaseDB = admin.firestore();
                const deletedDocument = yield this.get(id);
                const UserDocument = firebaseDB.collection("productos").doc(id);
                yield UserDocument.delete(); //vamos a crear un documento cuya key sea (algo generico)
                //a ese documento le metemos data en formato json
                console.log("Se elimino un documento!");
                return deletedDocument;
            }
            catch (err) {
                console.log("ERROR");
                console.log(err);
            }
        });
    }
    query(options) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const firebaseDB = admin.firestore();
                let data = yield firebaseDB.collection("productos").get();
                let docs = data.docs;
                let productos = docs.map((aDoc) => {
                    const data = aDoc.data();
                    data.id = aDoc.id;
                    return productos_1.dataOrdered(data);
                });
                const query = [];
                if (options.nombre)
                    query.push((aProduct) => aProduct.nombre == options.nombre);
                if (options.codigo)
                    query.push((aProduct) => aProduct.codigo == options.codigo);
                if (options.precioMin) {
                    query.push((aProduct) => aProduct.precio >= Number(options.precioMin));
                }
                if (options.precioMax) {
                    query.push((aProduct) => aProduct.precio <= Number(options.precioMax));
                }
                if (options.stockMin) {
                    query.push((aProduct) => aProduct.stock >= Number(options.stockMin));
                }
                if (options.stockMax) {
                    query.push((aProduct) => aProduct.stock <= Number(options.stockMax));
                }
                return productos.filter((aProduct) => query.every((x) => x(aProduct)));
            }
            catch (err) {
                console.log("ERROR");
                console.log(err);
            }
        });
    }
}
exports.ProductosFIREBASEDAO = ProductosFIREBASEDAO;
