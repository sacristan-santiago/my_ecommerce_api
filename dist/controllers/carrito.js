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
exports.carritoController = void 0;
const carrito_1 = require("../persistencia/carrito");
const productosFS_1 = require("../persistencia/productosFS");
class Carrito {
    getProductosCarrito(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const id = Number(req.params.id);
            if (id) {
                const productoCarrito = yield carrito_1.carritoPersistencia.getProducts(id);
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
                carritoProductos: yield carrito_1.carritoPersistencia.getProducts(),
            });
        });
    }
    addProductoCarrito(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const id = Number(req.params.id);
            if (yield carrito_1.carritoPersistencia.getProducts(id)) {
                return res.json({
                    msg: "El producto ya se encuentra en el carrito",
                });
            }
            //AGREGO PRODUCTO AL CARRITO DESDE LA PERSISTENCIA DE PRODUCTOS
            const newItem = yield productosFS_1.productsPersistencia.find(id);
            if (!newItem) {
                return res.status(404).json({
                    msg: "Producto no encontrado en base datos de productos",
                });
            }
            else {
                yield carrito_1.carritoPersistencia.addProduct(newItem);
                return res.json({
                    msg: "Nuevo producto agregado al carrito",
                    nuevoProducto: newItem,
                });
            }
        });
    }
    deleteProductoCarrito(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const id = Number(req.params.id);
            if (!id) {
                return res.status(404).json({
                    msg: "Es necesario definir un id"
                });
            }
            const producto = yield carrito_1.carritoPersistencia.findProduct(id);
            if (!producto) {
                return res.status(400).json({
                    msg: "Producto no encontrado en el carrito"
                });
            }
            res.json({
                msg: "Producto borrado del carrito",
                producto: yield carrito_1.carritoPersistencia.deleteProduct(id),
            });
        });
    }
}
exports.carritoController = new Carrito();
