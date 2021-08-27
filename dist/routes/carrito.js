"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const router = express_1.Router();
router.get("/", (req, res) => {
    res.json("GET A CARRITO");
});
router.get("/", (req, res) => {
    res.json("POST A CARRITO");
});
router.get("/", (req, res) => {
    res.json("PUT A CARRITO");
});
router.get("/", (req, res) => {
    res.json("DELETE A CARRITO");
});
exports.default = router;
