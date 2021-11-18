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
const usuarios_1 = require("./usuarios");
const productos_2 = require("./productos");
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
    getCart(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.carrito.get(userId);
        });
    }
    createCart(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield usuarios_1.usuariosAPI.getUsers(userId);
            if (!user.length)
                throw new Error('User does not exist. Error creating cart');
            const newCart = yield this.carrito.createCart(userId);
            return newCart;
        });
    }
    addProduct(cartId, productId, amount) {
        return __awaiter(this, void 0, void 0, function* () {
            const product = (yield productos_2.productsAPI.getProducts(productId))[0];
            const addProduct = {
                _id: productId,
                nombre: product.nombre,
                precio: product.precio,
                amount,
            };
            const updatedCart = yield this.carrito.addProduct(cartId, addProduct);
            return updatedCart;
        });
    }
    deleteProduct(cartId, productId, amount) {
        return __awaiter(this, void 0, void 0, function* () {
            const product = (yield productos_2.productsAPI.getProducts(productId))[0];
            const deleteProduct = {
                _id: productId,
                nombre: product.nombre,
                precio: product.precio,
                amount,
            };
            const updatedCart = yield this.carrito.deleteProduct(cartId, deleteProduct);
            return updatedCart;
        });
    }
    clearCart(cartId) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.carrito.clearCart(cartId);
        });
    }
    submitCart(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const order = yield this.carrito.submitCart(userId);
            return order;
        });
    }
}
exports.carritoAPI = new CarritoAPI();
