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
const message_1 = require("../../../schemas/message");
const users_1 = require("../../../schemas/users");
const normalizr_1 = require("normalizr");
class UsersPersistencia {
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
    saveMessage(message) {
        return __awaiter(this, void 0, void 0, function* () {
            let messageToSave = new message_1.messagemodel(message);
            let savedMessage = yield messageToSave.save();
            return savedMessage;
        });
    }
    getAllMessages() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const author = new normalizr_1.schema.Entity('author', {}, { idAttribute: 'email' });
                const msge = new normalizr_1.schema.Entity('message', {
                    author: author,
                }, { idAttribute: '_id' });
                const msgesSchema = new normalizr_1.schema.Array(msge);
                //Si no se hace el map normalizr no le gusta la definicion del esquema
                let messages = (yield message_1.messagemodel.find()).map((aMsg) => ({
                    _id: aMsg._id,
                    author: aMsg.author,
                    text: aMsg.text,
                    time: aMsg.time,
                }));
                let normalizedMessages = normalizr_1.normalize(messages, msgesSchema);
                return normalizedMessages;
            }
            catch (err) {
                console.log('ERROR');
                console.log(err);
            }
        });
    }
    ;
}
exports.usersPersistencia = new UsersPersistencia;
