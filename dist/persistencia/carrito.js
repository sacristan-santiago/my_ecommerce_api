"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.carritoPersistencia = void 0;
const moment_1 = __importDefault(require("moment"));
const fs = require('fs/promises');
const path = require('path');
let carrito = {
    id: 1,
    timestamp: moment_1.default().format("D.M.YY HH:mm:ss"),
    productos: [
        { id: 2, timestamp: moment_1.default().format("D.M.YY HH:mm:ss"), nombre: "lapiz2", descripcion: "lapiz de caracteristicas 2", codigo: "ASD223", foto: "https://cdn.pixabay.com/photo/2020/08/08/05/15/pencil-5472136_960_720.png", precio: 210, stock: 11 },
        { id: 3, timestamp: moment_1.default().format("D.M.YY HH:mm:ss"), nombre: "lapiz3", descripcion: "lapiz de caracteristicas 3", codigo: "ASD323", foto: "https://cdn.pixabay.com/photo/2020/08/08/05/15/pencil-5472136_960_720.png", precio: 220, stock: 12 },
        { id: 5, timestamp: moment_1.default().format("D.M.YY HH:mm:ss"), nombre: "lapiz5", descripcion: "lapiz de caracteristicas 5", codigo: "ASD523", foto: "https://cdn.pixabay.com/photo/2020/08/08/05/15/pencil-5472136_960_720.png", precio: 240, stock: 14 },
    ]
};
class Carrito {
    findProduct(id = undefined) {
        return carrito.productos.find(aProduct => aProduct.id == Number(id));
    }
    getProducts(id = undefined) {
        if (id) {
            return carrito.productos.find(aProduct => aProduct.id == Number(id));
        }
        return carrito.productos;
    }
    addProduct(newProduct) {
        carrito.productos.push(newProduct);
        return newProduct;
    }
    deleteProduct(id) {
        const deletedProduct = carrito.productos.filter(aProduct => aProduct.id == Number(id));
        carrito.productos = carrito.productos.filter(aProduct => aProduct.id !== Number(id));
        return deletedProduct;
    }
}
exports.carritoPersistencia = new Carrito();
