"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_1 = __importDefault(require("../middlewares/auth"));
const auth_2 = require("../middlewares/auth");
const child_process_1 = require("child_process");
const path_1 = __importDefault(require("path"));
const router = express_1.Router();
router.get('/', auth_2.isLoggedIn, (req, res) => {
    const dataDinamica = {
        mostrarFormulario: true,
    };
    res.render("main", dataDinamica);
});
router.get("/random", (req, res) => {
    let cant;
    (req.query.cant) ? cant = Number(req.query.cant) : cant = 100000000;
    const scriptPath = path_1.default.resolve(__dirname, '../utils/randomnumbers');
    const computo = child_process_1.fork(scriptPath);
    computo.send(cant);
    computo.on("message", (obj) => {
        res.json(obj);
    });
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
