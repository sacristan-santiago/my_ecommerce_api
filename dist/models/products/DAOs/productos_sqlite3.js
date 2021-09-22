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
exports.ProductosSQLITE3DAO = void 0;
const mysqlDB_1 = require("../../../services/mysqlDB");
class ProductosSQLITE3DAO {
    get(_id) {
        return __awaiter(this, void 0, void 0, function* () {
            const id = Number(_id);
            if (id) {
                return mysqlDB_1.sqliteDB.from("productos").where({ id: id }).select();
            }
            return mysqlDB_1.sqliteDB.from("productos").select();
        });
    }
    add(data) {
        return __awaiter(this, void 0, void 0, function* () {
            return mysqlDB_1.sqliteDB.from("productos").insert(data);
        });
    }
    update(_id, data) {
        return __awaiter(this, void 0, void 0, function* () {
            const id = Number(_id);
            yield mysqlDB_1.sqliteDB.from("productos").where({ id: id }).update(data);
            //returning updated product
            return mysqlDB_1.sqliteDB.from("productos").where({ id: id }).select();
        });
    }
    delete(_id) {
        return __awaiter(this, void 0, void 0, function* () {
            const id = Number(_id);
            const deleted = yield mysqlDB_1.sqliteDB.from("productos").where({ id: id }).select();
            yield mysqlDB_1.sqliteDB.from("productos").where({ id: id }).del();
            //returning deleted product
            return deleted;
        });
    }
}
exports.ProductosSQLITE3DAO = ProductosSQLITE3DAO;
