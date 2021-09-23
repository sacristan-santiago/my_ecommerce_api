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
exports.CarritoMYSQLDAO = void 0;
const mysqlDB_1 = require("../../../services/mysqlDB");
class CarritoMYSQLDAO {
    findProduct(id = undefined) {
        return __awaiter(this, void 0, void 0, function* () {
            return mysqlDB_1.myMariaDB.from("carrito").where({ id: id }).select();
        });
    }
    getProducts(id = undefined) {
        return __awaiter(this, void 0, void 0, function* () {
            if (id) {
                const output = yield mysqlDB_1.myMariaDB.from("carrito").where({ id: id }).select();
                if (output[0]) {
                    return output;
                }
                return;
            }
            return mysqlDB_1.myMariaDB.from("carrito").select();
        });
    }
    addProduct(newItem) {
        return __awaiter(this, void 0, void 0, function* () {
            yield mysqlDB_1.myMariaDB.from("carrito").insert(newItem);
            return newItem;
        });
    }
    deleteProduct(_id) {
        return __awaiter(this, void 0, void 0, function* () {
            const id = Number(_id);
            const deleted = yield mysqlDB_1.myMariaDB.from("carrito").where({ id: id }).select();
            yield mysqlDB_1.myMariaDB.from("carrito").where({ id: id }).del();
            //returning deleted product
            return deleted;
        });
    }
}
exports.CarritoMYSQLDAO = CarritoMYSQLDAO;
