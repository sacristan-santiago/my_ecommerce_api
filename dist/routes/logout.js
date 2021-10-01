"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const router = express_1.Router();
router.get('/', (req, res) => {
    const dataDinamica = {
        mostrarLogout: true,
        username: req.session.username
    };
    req.session.destroy(() => { });
    res.render("main", dataDinamica);
});
exports.default = router;
