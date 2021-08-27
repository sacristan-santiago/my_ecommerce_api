"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.productsController = void 0;
const productos_1 = require("../persistencia/productos");
class Producto {
    getProducts(req, res) {
        const { id } = req.params;
        if (id) {
            const producto = productos_1.productsPersistencia.get(Number(id));
            if (!producto) {
                return res.status(404).json({
                    msg: "Producto no encontrado",
                });
            }
            return res.json({
                data: producto,
            });
        }
        res.json({
            data: productos_1.productsPersistencia.get(),
        });
    }
    checkProducts(req, res, next) {
        const { nombre, precio } = req.body;
        if (!nombre || !precio || typeof nombre !== "string" || isNaN(precio)) {
            return res.status(400).json({
                msg: "Campos del body invalidos",
            });
        }
        next();
    }
    addProducts(req, res) {
        const newItem = productos_1.productsPersistencia.add(req.body);
        res.json({
            msg: "Producto agregado con exito",
            data: newItem
        });
    }
    updateProducts(req, res) {
        const id = Number(req.params.id);
        const producto = productos_1.productsPersistencia.find(id);
        if (!producto) {
            return res.status(404).json({
                msg: "Producto no encontrado",
            });
        }
        res.json({
            msg: "producto actualizado",
            data: productos_1.productsPersistencia.update(id, req.body)
        });
    }
    deleteProducts(req, res) {
        const { id } = req.params;
        if (!id) {
            return res.status(404).json({
                msg: "es necesario definir un id"
            });
        }
        const producto = productos_1.productsPersistencia.find(Number(id));
        if (!producto) {
            return res.status(400).json({
                msg: "producto no encontrado"
            });
        }
        res.json({
            msg: "Producto borrado",
            data: productos_1.productsPersistencia.delete(Number(id)),
        });
    }
}
exports.productsController = new Producto();
