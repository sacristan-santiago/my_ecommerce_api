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
exports.ProductosATLASMONGODAO = void 0;
const productos_1 = require("../../../schemas/productos");
const counters_1 = require("../../../schemas/counters");
class ProductosATLASMONGODAO {
    get(id) {
        return __awaiter(this, void 0, void 0, function* () {
            if (id) {
                return productos_1.productosmodel.find({ _Id: id });
            }
            return productos_1.productosmodel.find({});
        });
    }
    add(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const producto = data;
            producto.timestamp = new Date;
            //updateo id en base de datos
            yield counters_1.countersmodel.findByIdAndUpdate("productos counter identifier", { $inc: { count: 1 } });
            const productscounter = yield counters_1.countersmodel.find({ _id: "productos counter identifier" });
            producto.uID = productscounter[0].count;
            return productos_1.productosmodel.insertMany([producto]);
        });
    }
    update(id, data) {
        return __awaiter(this, void 0, void 0, function* () {
            const producto = data;
            producto.timestamp = new Date;
            producto.uID = id;
            yield productos_1.productosmodel.findOneAndUpdate({ uID: id }, producto);
            //returning updated product
            return productos_1.productosmodel.find({ uID: id });
        });
    }
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const deleted = yield productos_1.productosmodel.find({ uID: id });
            yield productos_1.productosmodel.deleteOne({ uID: id });
            //returning deleted product
            return deleted;
        });
    }
    query(options) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let productos = yield productos_1.productosmodel.find({});
                const query = [];
                if (options.nombre)
                    query.push((aProduct) => aProduct.nombre == options.nombre);
                if (options.codigo)
                    query.push((aProduct) => aProduct.codigo == options.codigo);
                if (options.precioMin) {
                    query.push((aProduct) => aProduct.precio >= Number(options.precioMin));
                }
                if (options.precioMax) {
                    query.push((aProduct) => aProduct.precio <= Number(options.precioMax));
                }
                if (options.stockMin) {
                    query.push((aProduct) => aProduct.stock >= Number(options.stockMin));
                }
                if (options.stockMax) {
                    query.push((aProduct) => aProduct.stock <= Number(options.stockMax));
                }
                return productos.filter((aProduct) => query.every((x) => x(aProduct)));
            }
            catch (err) {
                console.log("ERROR");
                console.log(err);
            }
        });
    }
}
exports.ProductosATLASMONGODAO = ProductosATLASMONGODAO;
