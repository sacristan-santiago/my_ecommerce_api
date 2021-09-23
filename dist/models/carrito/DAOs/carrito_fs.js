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
exports.CarritoFSDAO = void 0;
const moment_1 = __importDefault(require("moment"));
const promises_1 = __importDefault(require("fs/promises"));
class CarritoFSDAO {
    constructor(fileRoute) {
        this.rutaArchivo = fileRoute;
    }
    findProduct(id = undefined) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const data = yield promises_1.default.readFile(this.rutaArchivo, "utf-8");
                const carrito = JSON.parse(data);
                return carrito.productos.find((aProduct) => aProduct.id == id);
            }
            catch (_a) {
                return console.log("no se encontro el archivo");
            }
        });
    }
    getProducts(id = undefined) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const data = yield promises_1.default.readFile(this.rutaArchivo, "utf-8");
                const carrito = JSON.parse(data);
                if (id) {
                    return carrito.productos.find((aProduct) => aProduct.id == id);
                }
                return carrito.productos;
            }
            catch (_a) {
                return console.log("no se encontro el archivo");
            }
        });
    }
    addProduct(newProduct) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const data = yield promises_1.default.readFile(this.rutaArchivo, "utf-8");
                const carrito = JSON.parse(data);
                //Agrego producto y actulizo timestamp del carrito
                carrito.productos.push(newProduct);
                carrito.timestamp = moment_1.default().format("D.M.YY HH:mm:ss");
                yield promises_1.default.writeFile(this.rutaArchivo, JSON.stringify(carrito, null, "\t"));
                console.log("El producto fue agregado al carrito!");
                return newProduct;
            }
            catch (_a) {
                return console.log("no se encontro el archivo");
            }
        });
    }
    deleteProduct(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const data = yield promises_1.default.readFile(this.rutaArchivo, "utf-8");
                const carrito = JSON.parse(data);
                const deletedProduct = carrito.productos.filter((aProduct) => aProduct.id == id);
                //borro producto y actualizo timestamp del carrito 
                carrito.productos = carrito.productos.filter((aProduct) => aProduct.id !== id);
                carrito.timestamp = moment_1.default().format("D.M.YY HH:mm:ss");
                yield promises_1.default.writeFile(this.rutaArchivo, JSON.stringify(carrito, null, "\t"));
                console.log("El producto fue eliminado del carrito!");
                return deletedProduct;
            }
            catch (_a) {
                return console.log("no se encontro el archivo");
            }
        });
    }
}
exports.CarritoFSDAO = CarritoFSDAO;
