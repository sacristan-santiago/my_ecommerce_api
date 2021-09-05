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
exports.ProductoPersistencia = void 0;
const db_1 = require("../services/db");
class ProductosPersistencia {
    getAll() {
        return __awaiter(this, void 0, void 0, function* () {
            return db_1.myMariaDB.from("productos").select();
        });
    }
    get(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return db_1.myMariaDB.from("productos").where({ id: id }).select();
        });
    }
    add(data) {
        return __awaiter(this, void 0, void 0, function* () {
            return db_1.myMariaDB.from("productos").insert(data);
        });
    }
    update(id, data) {
        return __awaiter(this, void 0, void 0, function* () {
            yield db_1.myMariaDB.from("productos").where({ id: id }).update(data);
            //returning updated product
            return db_1.myMariaDB.from("productos").where({ id: id }).select();
        });
    }
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const deleted = yield db_1.myMariaDB.from("productos").where({ id: id }).select();
            yield db_1.myMariaDB.from("productos").where({ id: id }).del();
            //returning deleted product
            return deleted;
        });
    }
}
exports.ProductoPersistencia = new ProductosPersistencia;
