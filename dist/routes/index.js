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
const admin_1 = require("../middlewares/admin");
const router = express_1.Router();
router.use("/productos", productos_1.default);
router.use("/carrito", auth_1.isLoggedIn, carrito_1.default);
router.use("/chat", chat_1.default);
router.use("/", userlog_1.default);
router.use("/usuarios", admin_1.checkAdmin, usuarios_1.default);
router.get('/hola', (req, res) => {
    res.json({
        pid: process.pid,
        msg: 'HOLA',
    });
});
router.get('/slow', function (req, res) {
    console.log(`PID => ${process.pid} will work slow`);
    let sum = 0;
    for (let i = 0; i < 6e9; i++) {
        sum += i;
    }
    res.json({
        pid: process.pid,
        sum,
    });
});
exports.default = router;
