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
exports.productsController = void 0;
const productosMongoose_1 = require("../persistencia/productosMongoose");
class Producto {
    getProducts(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            if (id) {
                const producto = yield productosMongoose_1.ProductsPersistencia.get(Number(id));
                if (!producto[0]) {
                    return res.status(404).json({
                        msg: "Producto no encontrado",
                    });
                }
                return res.json({
                    producto: producto,
                });
            }
            res.json({
                productos: yield productosMongoose_1.ProductsPersistencia.getAll(),
            });
        });
    }
    checkProducts(req, res, next) {
        const { nombre, precio, descripcion, codigo, foto, stock } = req.body;
        if (!nombre || !precio || typeof nombre !== "string" || isNaN(precio) || !descripcion || !codigo || !foto || !stock) {
            return res.status(400).json({
                msg: "Campos del body invalidos",
            });
        }
        next();
    }
    addProducts(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const newItem = yield productosMongoose_1.ProductsPersistencia.add(req.body);
            res.json({
                msg: "Producto agregado con exito",
                data: newItem
            });
        });
    }
    updateProducts(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const id = Number(req.params.id);
            const producto = yield productosMongoose_1.ProductsPersistencia.get(id);
            if (!producto[0]) {
                return res.status(404).json({
                    msg: "Producto no encontrado",
                });
            }
            res.json({
                msg: "producto actualizado",
                data: yield productosMongoose_1.ProductsPersistencia.update(id, req.body)
            });
        });
    }
    deleteProducts(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            if (!id) {
                return res.status(404).json({
                    msg: "es necesario definir un id"
                });
            }
            const producto = yield productosMongoose_1.ProductsPersistencia.get(Number(id));
            if (!producto[0]) {
                return res.status(400).json({
                    msg: "producto no encontrado"
                });
            }
            res.json({
                msg: "Producto borrado",
                data: yield productosMongoose_1.ProductsPersistencia.delete(Number(id)),
            });
        });
    }
}
exports.productsController = new Producto();
