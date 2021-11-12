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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const passport_1 = __importDefault(require("passport"));
const auth_1 = require("../middlewares/auth");
const multer_1 = require("../middlewares/multer");
const router = express_1.Router();
router.get('/', auth_1.isLoggedIn, (req, res) => {
    const dataDinamica = {
        mostrarFormulario: true,
    };
    res.render("main", dataDinamica);
});
router.get('/login', (req, res) => {
    const dataDinamica = {
        mostrarLogin: true,
        username: req.session.username,
    };
    res.render("main", dataDinamica);
});
router.post('/login', passport_1.default.authenticate("login", {
    successRedirect: './',
    failureRedirect: './login'
}));
router.get('/register', (req, res) => {
    const dataDinamica = {
        mostrarRegister: true,
    };
    res.render("main", dataDinamica);
});
router.post('/register', passport_1.default.authenticate("signup"), (req, res, next) => {
    const dataDinamica = {
        mostrarRegisterOk: true,
    };
    res.render("main", dataDinamica);
});
router.post("/upload", multer_1.upload.single("file"), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (req.file === undefined)
        return res.send("you must select a file");
    const imgUrl = `http://localhost:8080/file/${req.file.filename}`;
    return res.send(imgUrl);
}));
router.get('/logout', (req, res) => {
    const dataDinamica = {
        mostrarLogout: true,
        username: req.session.username
    };
    req.session.destroy(() => { });
    res.render("main", dataDinamica);
});
exports.default = router;
