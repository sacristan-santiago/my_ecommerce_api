"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.carritoController = void 0;
const carrito_1 = require("../persistencia/carrito");
const productos_1 = require("../persistencia/productos");
class Carrito {
    getProductosCarrito(req, res) {
        const id = Number(req.params.id);
        if (id) {
            const productoCarrito = carrito_1.carritoPersistencia.getProducts(id);
            if (!productoCarrito) {
                return res.status(404).json({
                    msg: "Producto no encontrado en carrito",
                });
            }
            return res.json({
                carritoProducto: productoCarrito,
            });
        }
        res.json({
            carritoProductos: carrito_1.carritoPersistencia.getProducts(),
        });
    }
    addProductoCarrito(req, res) {
        const id = Number(req.params.id);
        if (carrito_1.carritoPersistencia.getProducts(id)) {
            return res.json({
                msg: "El producto ya se encuentra en el carrito",
            });
        }
        //AGREGO PRODUCTO AL CARRITO DESDE LA PERSISTENCIA DE PRODUCTOS
        const newItem = productos_1.productsPersistencia.find(id);
        if (!newItem) {
            return res.status(404).json({
                msg: "Producto no encontrado en base datos de productos",
            });
        }
        else {
            carrito_1.carritoPersistencia.addProduct(newItem);
            return res.json({
                msg: "Nuevo producto agregado al carrito",
                nuevoProducto: newItem,
            });
        }
    }
    deleteProductoCarrito(req, res) {
        const id = Number(req.params.id);
        if (!id) {
            return res.status(404).json({
                msg: "Es necesario definir un id"
            });
        }
        const producto = carrito_1.carritoPersistencia.findProduct(id);
        if (!producto) {
            return res.status(400).json({
                msg: "Producto no encontrado en el carrito"
            });
        }
        res.json({
            msg: "Producto borrado del carrito",
            producto: carrito_1.carritoPersistencia.deleteProduct(id),
        });
    }
}
exports.carritoController = new Carrito();
