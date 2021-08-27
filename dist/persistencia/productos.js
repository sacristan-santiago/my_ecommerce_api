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
exports.productsPersistencia = void 0;
const moment_1 = __importDefault(require("moment"));
const promises_1 = __importDefault(require("fs/promises"));
const path_1 = __importDefault(require("path"));
const productosRute = "../database/productos.txt";
class Productos {
    find(id = undefined) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const ruta = path_1.default.resolve(__dirname, productosRute);
                const data = yield promises_1.default.readFile(ruta, "utf-8");
                const productos = JSON.parse(data);
                return productos.find((aProduct) => aProduct.id == Number(id));
            }
            catch (_a) {
                return console.log([]);
            }
        });
    }
    get(id = undefined) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const ruta = path_1.default.resolve(__dirname, productosRute);
                const data = yield promises_1.default.readFile(ruta, "utf-8");
                const productos = JSON.parse(data);
                if (id) {
                    return productos.find((aProduct) => aProduct.id == Number(id));
                }
                // console.log(productos)
                return productos;
            }
            catch (_a) {
                return console.log([]);
            }
        });
    }
    add(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const newItem = {
                id: undefined,
                timestamp: moment_1.default().format("D.M.YY HH:mm:ss"),
                nombre: data.nombre,
                descripcion: data.descripcion,
                codigo: data.codigo,
                foto: data.foto,
                precio: Number(data.precio),
                stock: Number(data.stock),
            };
            try {
                const ruta = path_1.default.resolve(__dirname, productosRute);
                const data = yield promises_1.default.readFile(ruta, "utf-8");
                const productos = JSON.parse(data);
                newItem.id = productos.length + 1;
                productos.push(newItem);
                yield promises_1.default.writeFile(ruta, JSON.stringify(productos, null, "\t"));
                console.log("El archivo se modifico!");
            }
            catch (err) {
                console.log('ERROR ==>', err);
                throw new Error(err);
            }
            return newItem;
        });
    }
    update(id, data) {
        return __awaiter(this, void 0, void 0, function* () {
            const replaceItem = {
                id: id,
                timestamp: moment_1.default().format("D.M.YY HH:mm:ss"),
                nombre: data.nombre,
                descripcion: data.descripcion,
                codigo: data.codigo,
                foto: data.foto,
                precio: Number(data.precio),
                stock: Number(data.stock)
            };
            try {
                const ruta = path_1.default.resolve(__dirname, productosRute);
                const data = yield promises_1.default.readFile(ruta, "utf-8");
                let productos = JSON.parse(data);
                productos = productos.map((aProduct) => {
                    if (aProduct.id !== id) {
                        return aProduct;
                    }
                    else {
                        return replaceItem;
                    }
                });
                yield promises_1.default.writeFile(ruta, JSON.stringify(productos, null, "\t"));
                console.log("El archivo se modifico!");
            }
            catch (err) {
                console.log('ERROR ==>', err);
                throw new Error(err);
            }
            return replaceItem;
        });
    }
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const ruta = path_1.default.resolve(__dirname, productosRute);
                const data = yield promises_1.default.readFile(ruta, "utf-8");
                let productos = JSON.parse(data);
                const deletedProduct = productos.filter((aProduct) => aProduct.id == Number(id));
                productos = productos.filter((aProduct) => aProduct.id !== Number(id));
                yield promises_1.default.writeFile(ruta, JSON.stringify(productos, null, "\t"));
                console.log("El archivo se elimino!");
                return deletedProduct;
            }
            catch (err) {
                console.log('ERROR ==>', err);
                throw new Error(err);
            }
        });
    }
}
exports.productsPersistencia = new Productos();
