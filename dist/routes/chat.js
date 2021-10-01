"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const router = express_1.Router();
router.get("/", (req, res) => {
    // const productos = producto.vista();
    const productos = "";
    const dataDinamica = {
        mostrarFormulario: false,
        mostrarTable: false,
        productos: productos,
        mostrarChatini: true,
        mostrarChat: false,
    };
    res.render("main", dataDinamica);
});
router.get("/room", (req, res) => {
    // const productos = producto.vista();
    const productos = "";
    const dataDinamica = {
        mostrarFormulario: false,
        mostrarTable: false,
        productos: productos,
        mostrarLoggin: false,
        mostrarChat: true,
    };
    res.render("main", dataDinamica);
});
exports.default = router;
