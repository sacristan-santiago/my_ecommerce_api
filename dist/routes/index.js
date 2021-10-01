"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const productos_1 = __importDefault(require("./productos"));
const carrito_1 = __importDefault(require("./carrito"));
const chat_1 = __importDefault(require("./chat"));
const login_1 = __importDefault(require("./login"));
const logout_1 = __importDefault(require("./logout"));
const router = express_1.Router();
router.use("/productos", productos_1.default);
router.use("/carrito", carrito_1.default);
router.use("/chat", chat_1.default);
router.use("/login", login_1.default);
router.use("/logout", logout_1.default);
exports.default = router;
