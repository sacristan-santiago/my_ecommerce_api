"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const productos_1 = __importDefault(require("./productos"));
const carrito_1 = __importDefault(require("./carrito"));
const chat_1 = __importDefault(require("./chat"));
const usuarios_1 = __importDefault(require("./usuarios"));
const userlog_1 = __importDefault(require("./userlog"));
const auth_1 = require("../middlewares/auth");
const router = express_1.Router();
router.use("/productos", productos_1.default);
router.use("/carrito", carrito_1.default);
router.use("/chat", chat_1.default);
router.use("/", userlog_1.default);
router.use("/usuarios", auth_1.isLoggedIn, usuarios_1.default);
exports.default = router;
