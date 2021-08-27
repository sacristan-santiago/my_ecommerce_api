"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.carritoPersistencia = void 0;
let carrito = {
    id: 1,
    timestamp: Date.now(),
    productos: [
        { id: 2, nombre: "lapiz2", precio: 210 },
        { id: 3, nombre: "lapiz3", precio: 220 },
        { id: 5, nombre: "lapiz5", precio: 240 },
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
