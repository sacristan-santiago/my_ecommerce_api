"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const router = express_1.Router();
//Hardcoded login id and pass
const myUser = 'santi';
const myPassword = 'rivercampeon';
router.get('/', (req, res) => {
    if (req.session.loggedIn) {
        const dataDinamica = {
            mostrarFormulario: true,
            username: req.session.username,
        };
        res.render("main", dataDinamica);
    }
    else {
        const dataDinamica = {
            mostrarLogin: true
        };
        res.render("main", dataDinamica);
    }
});
router.post('/', (req, res) => {
    console.log(req.body);
    const { username, password } = req.body;
    if (username == myUser && password == myPassword) {
        req.session.loggedIn = true;
        req.session.username = username;
        const dataDinamica = {
            mostrarFormulario: true,
            username: req.session.username,
        };
        res.render("main", dataDinamica);
    }
    else {
        res.status(401).json({ msg: 'no estas autorizado' });
    }
});
exports.default = router;
