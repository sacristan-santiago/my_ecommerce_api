"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.carritomodel = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const productos_1 = require("../schemas/productos");
const carritoCollection = "carrito";
const CarritoSchema = new mongoose_1.default.Schema({
    uID: { type: Number, required: true },
    timestamp: { type: Date, required: true },
    productos: [productos_1.ProductoSchema],
});
exports.carritomodel = mongoose_1.default.model(carritoCollection, CarritoSchema);
