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
exports.carritoAPI = void 0;
const carrito_factory_1 = require("../models/carrito/carrito.factory");
const productos_1 = require("./productos");
class CarritoAPI {
    constructor() {
        this.carrito = carrito_factory_1.CarritoFactoryDAO.get(productos_1.tipoPersistencia);
    }
    findProduct(id = undefined) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.carrito.findProduct(id);
        });
    }
    getProducts(id = undefined) {
        return __awaiter(this, void 0, void 0, function* () {
            if (id)
                return this.carrito.getProducts(id);
            return this.carrito.getProducts();
        });
    }
    addProduct(newItem) {
        return __awaiter(this, void 0, void 0, function* () {
            const newProduct = yield this.carrito.addProduct(newItem);
            return newProduct;
        });
    }
    deleteProduct(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.carrito.deleteProduct(id);
        });
    }
}
exports.carritoAPI = new CarritoAPI();
