"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.usersmodel = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const usersCollection = "users";
const UsersSchema = new mongoose_1.default.Schema({
    uID: { type: String, required: true },
    username: { type: String, require: true, max: 35 },
    room: { type: String, require: true, max: 20 },
    messages: { type: Array }
});
exports.usersmodel = mongoose_1.default.model(usersCollection, UsersSchema);
