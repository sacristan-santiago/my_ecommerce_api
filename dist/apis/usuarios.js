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
exports.usuariosAPI = void 0;
const usuarios_factory_1 = require("../models/usuarios/usuarios.factory");
const productos_1 = require("./productos");
const carrito_1 = require("./carrito");
class UsuariosAPI {
    constructor() {
        this.usuarios = usuarios_factory_1.UsuariosFactoryDAO.get(productos_1.tipoPersistencia);
    }
    getUsers(id) {
        return __awaiter(this, void 0, void 0, function* () {
            if (id)
                return this.usuarios.get(id);
            return this.usuarios.get();
        });
    }
    addUser(userData) {
        return __awaiter(this, void 0, void 0, function* () {
            const newUser = yield this.usuarios.add(userData);
            yield carrito_1.carritoAPI.createCart(newUser._id);
            return newUser;
        });
    }
    updateUser(id, userData) {
        return __awaiter(this, void 0, void 0, function* () {
            const updatedUser = yield this.usuarios.update(id, userData);
            return updatedUser;
        });
    }
    deleteUser(id) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.usuarios.delete(id);
            //Borrar carrito tambien
        });
    }
    query(username, email) {
        return __awaiter(this, void 0, void 0, function* () {
            const query = {
                $or: [],
            };
            if (username)
                query.$or.push({ username });
            if (email)
                query.$or.push({ email });
            return this.usuarios.query(query);
        });
    }
}
exports.usuariosAPI = new UsuariosAPI();
