"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.countersmodel = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const countersCollection = "counters";
const CounterSchema = new mongoose_1.default.Schema({
    _id: { type: String, required: true },
    count: { type: Number, required: true },
    notes: { type: String, required: true },
});
exports.countersmodel = mongoose_1.default.model(countersCollection, CounterSchema);
