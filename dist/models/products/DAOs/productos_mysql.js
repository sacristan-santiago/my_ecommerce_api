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
exports.ProductosMYSQLDAO = void 0;
const mysqlDB_1 = require("../../../services/mysqlDB");
class ProductosMYSQLDAO {
    get(_id) {
        return __awaiter(this, void 0, void 0, function* () {
            const id = Number(_id);
            if (id) {
                return mysqlDB_1.myMariaDB.from("productos").where({ id: id }).select();
            }
            return mysqlDB_1.myMariaDB.from("productos").select();
        });
    }
    add(data) {
        return __awaiter(this, void 0, void 0, function* () {
            return mysqlDB_1.myMariaDB.from("productos").insert(data);
        });
    }
    update(_id, data) {
        return __awaiter(this, void 0, void 0, function* () {
            const id = Number(_id);
            yield mysqlDB_1.myMariaDB.from("productos").where({ id: id }).update(data);
            //returning updated product
            return mysqlDB_1.myMariaDB.from("productos").where({ id: id }).select();
        });
    }
    delete(_id) {
        return __awaiter(this, void 0, void 0, function* () {
            const id = Number(_id);
            const deleted = yield mysqlDB_1.myMariaDB.from("productos").where({ id: id }).select();
            yield mysqlDB_1.myMariaDB.from("productos").where({ id: id }).del();
            //returning deleted product
            return deleted;
        });
    }
    query(options) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let productos = yield mysqlDB_1.myMariaDB.from("productos").select();
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
exports.ProductosMYSQLDAO = ProductosMYSQLDAO;
