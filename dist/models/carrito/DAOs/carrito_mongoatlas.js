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
exports.CarritoATLASMONGODAO = void 0;
const carrito_1 = require("../../../schemas/carrito");
class CarritoATLASMONGODAO {
    get(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield carrito_1.carritomodel.findOne({ userId });
            if (!result)
                throw new Error('id not found');
            return result;
        });
    }
    createCart(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const newCart = new carrito_1.carritomodel({
                userId,
                products: [],
            });
            yield newCart.save();
            return newCart;
        });
    }
    productExist(cart, productId) {
        const index = cart.products.findIndex((aProduct) => aProduct._id == productId);
        if (index < 0)
            return false;
        return true;
    }
    addProduct(cartId, product) {
        return __awaiter(this, void 0, void 0, function* () {
            const cart = yield carrito_1.carritomodel.findById(cartId);
            if (!cart)
                throw new Error('Cart not found');
            const index = cart.products.findIndex((aProduct) => aProduct._id == product._id);
            if (index < 0)
                cart.products.push(product);
            else
                cart.products[index].amount += product.amount;
            yield cart.save();
            return cart;
        });
    }
    deleteProduct(cartId, product) {
        return __awaiter(this, void 0, void 0, function* () {
            const cart = yield carrito_1.carritomodel.findById(cartId);
            if (!cart)
                throw new Error('Cart not found');
            const index = cart.products.findIndex((aProduct) => aProduct._id == product._id);
            if (index < 0)
                throw new Error('Product not found');
            if (cart.products[index].amount <= product.amount)
                cart.products.splice(index, 1);
            else
                cart.products[index].amount -= product.amount;
            yield cart.save();
            return cart;
        });
    }
}
exports.CarritoATLASMONGODAO = CarritoATLASMONGODAO;
