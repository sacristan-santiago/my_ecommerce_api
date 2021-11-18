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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsuariosATLASMONGODAO = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const usuario_1 = require("../../../schemas/usuario");
class UsuariosATLASMONGODAO {
    get(id) {
        return __awaiter(this, void 0, void 0, function* () {
            let output = [];
            try {
                if (id) {
                    const document = yield usuario_1.UsuarioModel.findById(id);
                    if (document)
                        output.push(document);
                }
                else {
                    output = yield usuario_1.UsuarioModel.find();
                }
                return output;
            }
            catch (err) {
                return output;
            }
        });
    }
    add(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const newProduct = new usuario_1.UsuarioModel(data);
            yield newProduct.save();
            return newProduct;
        });
    }
    update(id, data) {
        return __awaiter(this, void 0, void 0, function* () {
            return usuario_1.UsuarioModel.findByIdAndUpdate(id, data);
        });
    }
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            yield usuario_1.UsuarioModel.findByIdAndDelete(id);
        });
    }
    query(query) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield usuario_1.UsuarioModel.find(query);
            return result[0];
        });
    }
    updatePhoto(id, photoId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                console.log(`llego, userId: ${id}, photoId: ${photoId}`);
                const user = yield usuario_1.UsuarioModel.findById(id);
                user.photoId = photoId;
                console.log(`nuevo user: ${user}`);
                yield usuario_1.UsuarioModel.findByIdAndUpdate(id, user);
            }
            catch (err) {
                console.log(err);
            }
        });
    }
    validateUserPassword(username, password) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield usuario_1.UsuarioModel.findOne({ username });
            if (!user)
                return false;
            const compare = yield bcrypt_1.default.compare(password, user.password);
            if (!compare)
                return false;
            return true;
        });
    }
}
exports.UsuariosATLASMONGODAO = UsuariosATLASMONGODAO;
