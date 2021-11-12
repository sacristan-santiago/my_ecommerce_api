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
exports.isLoggedIn = void 0;
const passport_1 = __importDefault(require("passport"));
const passport_local_1 = __importDefault(require("passport-local"));
const usuarios_1 = require("../apis/usuarios");
const usuario_1 = require("../schemas/usuario");
const users_1 = require("../schemas/users");
const logger_1 = require("../services/logger/logger");
const LocalStrategy = passport_local_1.default.Strategy;
const strategyOptionsLogin = {
    usernameField: "username",
    passwordField: "password",
};
const strategyOptionsSignup = {
    usernameField: "username",
    passwordField: "password",
    passReqToCallback: true
};
const loginFunc = (username, password, done) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield usuario_1.UsuarioModel.findOne({ username });
    if (!user) {
        logger_1.logger.warn(`Login fail for username ${username}: user does not exist`);
        return done(null, false, { message: 'User or password invalid' });
    }
    if (!user.isValidPassword(password)) {
        logger_1.logger.warn(`Login fail for username ${username}: password is not valid`);
        return done(null, false, { message: 'User or password invalid' });
    }
    logger_1.logger.info(`User ${username} logged in at ${new Date()}`);
    return done(null, user);
});
const signUpFunc = (req, username, password, done) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield users_1.userJoiSchema.validateAsync(req.body);
        const { username, password, password2, email, firstName, lastName } = req.body;
        const query = {
            $or: [{ username: username }, { email: email }],
        };
        const user = yield usuario_1.UsuarioModel.findOne(query);
        if (user) {
            logger_1.logger.warn(`Singup Fail for username ${username}: Username or email already exists`);
            return done(null, false, 'User already exists');
        }
        else {
            const userData = {
                username,
                password,
                email,
                firstName,
                lastName,
            };
            const newUser = yield usuarios_1.usuariosAPI.addUser(userData);
            return done(null, newUser);
        }
    }
    catch (err) {
        logger_1.logger.error(err.message);
        return done(err);
    }
});
const isLoggedIn = (req, res, done) => {
    if (!req.user)
        return res.status(401).json({ msg: 'Unathorized' });
    console.log(req.user);
    done();
};
exports.isLoggedIn = isLoggedIn;
//se puede copiar isloggedIn para is admin
passport_1.default.use("login", new LocalStrategy(strategyOptionsLogin, loginFunc));
passport_1.default.use("signup", new LocalStrategy(strategyOptionsSignup, signUpFunc));
passport_1.default.serializeUser((user, done) => {
    done(null, user._id);
});
passport_1.default.deserializeUser((userId, done) => {
    usuario_1.UsuarioModel.findById(userId, function (err, user) {
        done(err, user);
    });
});
