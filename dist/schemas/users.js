"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.usersmodel = exports.userJoiSchema = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const joi_1 = __importDefault(require("joi"));
const usersCollection = "users";
const PASS_RE = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
const UsersSchema = new mongoose_1.default.Schema({
    uID: { type: String, required: true },
    username: { type: String, require: true, max: 35 },
    room: { type: String, require: true, max: 20 },
    messages: { type: Array }
});
exports.userJoiSchema = joi_1.default.object({
    firstName: joi_1.default.string().min(4).max(15).required(),
    lastName: joi_1.default.string().min(4).max(15).required(),
    email: joi_1.default.string().email().required(),
    username: joi_1.default.string().min(5).max(10).required(),
    password: joi_1.default.string().regex(PASS_RE).required(),
    password2: joi_1.default.string().regex(PASS_RE).required(),
});
exports.usersmodel = mongoose_1.default.model(usersCollection, UsersSchema);
