"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.productosmodel = exports.ProductoSchema = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const productosCollection = "productos";
exports.ProductoSchema = new mongoose_1.default.Schema({
    uID: { type: Number, required: true },
    timestamp: { type: Date, required: true },
    nombre: { type: String, require: true, max: 100 },
    descripcion: { type: String, require: true, max: 100 },
    codigo: { type: String, require: true, max: 100 },
    foto: { type: String, require: true, max: 100 },
    precio: { type: Number, require: true },
    stock: { type: Number, require: true },
});
exports.productosmodel = mongoose_1.default.model(productosCollection, exports.ProductoSchema);
