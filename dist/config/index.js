"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const venv = {
    PORT: process.env.PORT || 8080,
    TIPO_PERSISTENCIA: process.env.TIPO_PERISTENCIA || "Memoria",
    MONGO_ATLAS_USER: process.env.MONGO_ATLAS_USER || 'user',
    MONGO_ATLAS_PASSWORD: process.env.MONGO_ATLAS_PASSWORD || 'pass',
    MONGO_ATLAS_CLUSTER: process.env.MONGO_ATLAS_CLUSTER || 'clusterUrl',
    MONGO_ATLAS_DBNAME: process.env.MONGO_ATLAS_DBNAME || 'dbNameAtlas',
    MONGO_LOCAL_DBNAME: process.env.MONGO_LOCAL_DBNAME || 'dbNameLocal',
    FIREBASE_PRIVATEKEY: process.env.FIREBASE_PRIVATEKEY || 'firebaseKey',
    FIREBASE_PROJECTID: process.env.FIREBASE_PROJECTID || 'firebaseProjectId',
    FIREBASE_CLIENTEMAIL: process.env.FIREBASE_CLIENTEMAIL || 'firebaseClienteEmail',
    SESSION_SECRET: process.env.SESSION_SECRET || "shhhh",
    SESSION_COOKIE_TIMEOUT: parseInt(process.env.SESSION_COOKIE_TIMEOUT || "2")
};
exports.default = venv;
