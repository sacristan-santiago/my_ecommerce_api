"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_1 = __importDefault(require("../middlewares/auth"));
const auth_2 = require("../middlewares/auth");
const child_process_1 = require("child_process");
const randomnumbers_1 = require("../utils/randomnumbers");
const path_1 = __importDefault(require("path"));
const index_1 = require("../index");
const logger_1 = require("../services/logger/logger");
const router = express_1.Router();
router.get('/', auth_2.isLoggedIn, (req, res) => {
    const dataDinamica = {
        mostrarFormulario: true,
    };
    res.render("main", dataDinamica);
});
router.get('/hola', (req, res) => {
    res.json({
        puerto: index_1.puerto,
        pid: process.pid,
        msg: 'HOLA',
    });
});
router.get('/warn', (req, res) => {
    res.json({
        msg: "Se emitio warn"
    });
    logger_1.logger.warn("Se emite mensaje warn");
});
router.get('/info', (req, res) => {
    res.json({
        msg: "Se emitio info"
    });
    logger_1.logger.info("Se emite mensaje info");
});
router.get('/error', (req, res) => {
    res.json({
        msg: "Se emitio error"
    });
    logger_1.logger.error("Se emite mensaje error");
});
router.get("/random", (req, res) => {
    console.log(index_1.modo);
    let cant;
    (req.query.cant) ? cant = Number(req.query.cant) : cant = 100000000;
    if (index_1.modo === "FORK") {
        const scriptPath = path_1.default.resolve(__dirname, '../utils/randomnumbers');
        const computo = child_process_1.fork(scriptPath);
        computo.send(cant);
        computo.on("message", (obj) => {
            res.json(obj);
        });
    }
    else {
        res.json(randomnumbers_1.generateObj(cant));
    }
});
router.get('/login', (req, res) => {
    const dataDinamica = {
        mostrarLogin: true,
        username: req.session.username,
    };
    res.render("main", dataDinamica);
});
router.get("/auth/facebook", auth_1.default.authenticate("facebook", { scope: ["email"] }));
router.get('/auth/facebook/callback', auth_1.default.authenticate('facebook', {
    successRedirect: '/api/datos',
    failureRedirect: '/api/fail',
}));
router.get('/fail', (req, res) => {
    res.render('main', { loginFail: true });
});
router.get('/datos', (req, res) => {
    let foto = 'noPhoto';
    let email = 'noEmail';
    if (req.isAuthenticated()) {
        const userData = req.user;
        if (userData.photos)
            foto = userData.photos[0].value;
        if (userData.emails)
            email = userData.emails[0].value;
        const dataDinamica = {
            mostrarUsuario: true,
            nombre: userData.displayName,
            foto,
            email,
        };
        res.render("main", dataDinamica);
    }
    else {
        res.redirect('/api/login');
    }
});
router.get('/logout', (req, res) => {
    const dataDinamica = {
        mostrarLogout: true,
        username: req.session.username
    };
    req.session.destroy(() => { });
    res.render("main", dataDinamica);
});
exports.default = router;
