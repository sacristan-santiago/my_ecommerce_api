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
exports.carritoController = void 0;
const carrito_1 = require("../apis/carrito");
const productos_1 = require("../apis/productos");
const mailservice_1 = require("../services/mailservice");
const twilio_1 = require("../services/twilio");
const config_1 = __importDefault(require("../config"));
// import {carritoQuery} from "../models/carrito/carrito.interface";
class Carrito {
    getCartByUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = req.user;
            const cart = yield carrito_1.carritoAPI.getCart(user._id);
            res.json(cart);
        });
    }
    addProduct(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = req.user;
            const cart = yield carrito_1.carritoAPI.getCart(user._id);
            const { productId, productAmount } = req.body;
            if (!productId || !productAmount)
                return res.status(400).json({ msg: 'Invalid body parameters' });
            const product = yield productos_1.productsAPI.getProducts(productId);
            if (!product.length)
                return res.status(400).json({ msg: 'product not found' });
            if (parseInt(productAmount) < 0)
                return res.status(400).json({ msg: 'Invalid amount' });
            const updatedCart = yield carrito_1.carritoAPI.addProduct(cart._id, productId, parseInt(productAmount));
            res.json({ msg: 'Product added', cart: updatedCart });
        });
    }
    deleteProduct(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = req.user;
            const cart = yield carrito_1.carritoAPI.getCart(user._id);
            const { productId, productAmount } = req.body;
            if (!productId || !productAmount)
                return res.status(400).json({ msg: 'Invalid body parameters' });
            const product = yield productos_1.productsAPI.getProducts(productId);
            if (!product.length)
                return res.status(400).json({ msg: 'product not found' });
            if (parseInt(productAmount) < 0)
                return res.status(400).json({ msg: 'Invalid amount' });
            const updatedCart = yield carrito_1.carritoAPI.deleteProduct(cart._id, productId, parseInt(productAmount));
            res.json({ msg: 'Product deleted', cart: updatedCart });
        });
    }
    submitCart(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = req.user;
            const cart = yield carrito_1.carritoAPI.getCart(user.id);
            if (cart.products.length > 0) {
                const order = yield carrito_1.carritoAPI.submitCart(user._id);
                if (order) {
                    const mailSubject = `Nuevo pedido de ${user.firstName} ${user.lastName}, mail: ${user.email} `;
                    const mailContent = `Has adquirido los siguiente productos: ${cart.products}`;
                    yield mailservice_1.EmailGmailService.sendEmail(config_1.default.GMAIL_EMAIL, mailSubject, mailContent);
                    const smsMessage = "Su pedido ha sido recibido y se encuentra en proceso.";
                    yield twilio_1.twilioService.sendMessage(user.phoneNumber, smsMessage);
                    const whatsappMessage = mailSubject;
                    yield twilio_1.twilioService.sendWhatsappMessage(config_1.default.ADMINISTRATOR_WHATSAPP_CELLPHONE, whatsappMessage);
                    yield carrito_1.carritoAPI.clearCart(cart._id);
                    return res.json({
                        order: order
                    });
                }
                return res.json({
                    msg: "Order did not submit, please try again"
                });
            }
            return res.json({
                msg: "Cart is empty, cannot submit order"
            });
        });
    }
}
exports.carritoController = new Carrito();
