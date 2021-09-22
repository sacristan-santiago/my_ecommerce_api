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
exports.usersPersistencia = void 0;
const users_1 = require("../schemas/users");
class ProductosPersistencia {
    userJoin(id, username, room) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = { uID: id, username, room };
                const userSaveModel = new users_1.usersmodel(user);
                yield userSaveModel.save();
                return users_1.usersmodel.find({ uID: id });
            }
            catch (e) {
                console.log(e);
            }
        });
    }
    getCurrentUser(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return users_1.usersmodel.find({ uID: id });
            }
            catch (e) {
                console.log(e);
            }
        });
    }
    getRoomUser(room) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return users_1.usersmodel.find({ room: room });
            }
            catch (e) {
                console.log(e);
            }
        });
    }
    userLeave(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const leavingUser = yield users_1.usersmodel.find({ uID: id });
                yield users_1.usersmodel.deleteOne({ uID: id });
                return leavingUser[0];
            }
            catch (e) {
                console.log(e);
            }
        });
    }
    saveMessage(id, message) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield users_1.usersmodel.findOne({ uID: id });
            user.messages.push(message);
            yield users_1.usersmodel.findOneAndUpdate({ uID: id }, { $set: { messages: user.messages } });
        });
    }
}
exports.usersPersistencia = new ProductosPersistencia;
