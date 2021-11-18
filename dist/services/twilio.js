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
exports.twilioService = void 0;
const config_1 = __importDefault(require("../config"));
const twilio_1 = __importDefault(require("twilio"));
class Twilio {
    constructor() {
        this.twilio = twilio_1.default(config_1.default.TWILIO_ACCOUNT_ID, config_1.default.TWILIO_TOKEN);
    }
    sendMessage(cellphoneNumber, message) {
        return __awaiter(this, void 0, void 0, function* () {
            const params = {
                body: message,
                from: config_1.default.TWILIO_CELLPHONE,
                to: cellphoneNumber,
            };
            const response = yield this.twilio.messages.create(params);
            return response;
        });
    }
    sendWhatsappMessage(cellphoneNumber, message) {
        return __awaiter(this, void 0, void 0, function* () {
            const params = {
                body: message,
                from: `whatsapp:${config_1.default.TWILIO_WHATSAPP_CELLPHONE}`,
                to: `whatsapp:${cellphoneNumber}`,
            };
            const response = yield this.twilio.messages.create(params);
            return response;
        });
    }
}
exports.twilioService = new Twilio();
