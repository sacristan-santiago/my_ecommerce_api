"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.messagemodel = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const messageCollection = "message";
const MessageSchema = new mongoose_1.default.Schema({
    author: {
        email: { type: String, required: true, max: 50 },
        nombre: { type: String, required: true, max: 50 },
        apellido: { type: String, required: true, max: 50 },
        alias: { type: String, required: true, max: 50 },
        edad: { type: Number, required: true },
        avatar: { type: String, required: true, max: 50 },
    },
    text: { type: String, required: true, max: 1000 },
    time: { type: String, required: true, max: 50 },
});
exports.messagemodel = mongoose_1.default.model(messageCollection, MessageSchema);
