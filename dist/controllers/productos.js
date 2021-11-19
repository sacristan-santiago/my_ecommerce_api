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
exports.addProducts = exports.getProducts = exports.getProduct = exports.productsController = void 0;
const productos_1 = require("../apis/productos");
class Producto {
    getProducts(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const { nombre, codigo, precioMin, precioMax, stockMin, stockMax } = req.query;
            if (id) {
                const producto = yield productos_1.productsAPI.getProducts(id);
                if (!producto) {
                    return res.status(404).json({
                        msg: "Producto no encontrado",
                    });
                }
                return res.status(200).json({
                    producto: yield productos_1.productsAPI.getProducts(id)
                });
            }
            const query = {};
            if (nombre)
                query.nombre = nombre.toString();
            if (codigo)
                query.codigo = codigo.toString();
            if (precioMin)
                query.precioMin = Number(precioMin);
            if (precioMax)
                query.precioMax = Number(precioMax);
            if (stockMin)
                query.stockMin = Number(stockMin);
            if (stockMax)
                query.stockMax = Number(stockMax);
            if (Object.keys(query).length) {
                return yield productos_1.productsAPI.query(query);
            }
            ;
            return res.status(200).json({
                productos: yield productos_1.productsAPI.getProducts()
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
            const newItem = yield productos_1.productsAPI.addProduct(req.body);
            return newItem;
        });
    }
    updateProducts(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const id = req.params.id;
            const producto = yield productos_1.productsAPI.getProducts(id);
            if (!producto) {
                return res.status(404).json({
                    msg: "Producto no encontrado",
                });
            }
            res.json({
                msg: "producto actualizado",
                data: yield productos_1.productsAPI.updateProduct(id, req.body)
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
            const producto = yield productos_1.productsAPI.getProducts(id);
            if (!producto) {
                return res.status(400).json({
                    msg: "producto no encontrado"
                });
            }
            res.json({
                msg: "El siguiente producto fue borrado",
                data: yield productos_1.productsAPI.deleteProduct(id)
            });
        });
    }
}
exports.productsController = new Producto();
const getProduct = (args) => __awaiter(void 0, void 0, void 0, function* () {
    return yield productos_1.productsAPI.getProducts(args.id);
});
exports.getProduct = getProduct;
const getProducts = () => __awaiter(void 0, void 0, void 0, function* () {
    return yield productos_1.productsAPI.getProducts();
});
exports.getProducts = getProducts;
const addProducts = (args) => __awaiter(void 0, void 0, void 0, function* () {
    return yield productos_1.productsAPI.addProduct(args);
});
exports.addProducts = addProducts;
