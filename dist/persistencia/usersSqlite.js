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
exports.userPersistencia = void 0;
const db_1 = require("../services/db");
class UsersPersistencia {
    userJoin(id, username, room) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = { id, username, room };
                yield db_1.sqliteDB.from("chat").insert(user);
                return db_1.sqliteDB.from("chat").where({ id: id }).select();
            }
            catch (e) {
                console.log(e);
            }
        });
    }
    getCurrentUser(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return db_1.sqliteDB.from("chat").where({ id: id }).select();
            }
            catch (e) {
                console.log(e);
            }
        });
    }
    getRoomUser(room) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return db_1.sqliteDB.from("chat").where({ room: room }).select();
            }
            catch (e) {
                console.log(e);
            }
        });
    }
    userLeave(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const leavingUser = yield db_1.sqliteDB.from("chat").where({ id: id }).select();
                yield db_1.sqliteDB.from("chat").where({ id: id }).del();
                return leavingUser[0];
            }
            catch (e) {
                console.log(e);
            }
        });
    }
}
exports.userPersistencia = new UsersPersistencia;
