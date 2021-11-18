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
exports.EmailGmailService = void 0;
const config_1 = __importDefault(require("../config"));
const nodemailer_1 = __importDefault(require("nodemailer"));
class Email {
    constructor(name, senderMail, password, port, host, secure = false) {
        this.owner = {
            name: name,
            address: senderMail,
        };
        this.transporter = nodemailer_1.default.createTransport({
            host: host,
            port: port,
            secure: secure,
            auth: {
                user: senderMail,
                pass: password,
            },
        });
        // this.transporter.verify().then(() => console.log('READY To Send Email'));
    }
    sendEmail(dest, subject, content, photoUrl = "") {
        return __awaiter(this, void 0, void 0, function* () {
            const mailOptions = {
                from: this.owner.adress,
                to: dest,
                subject,
                html: content,
                attachments: [
                    {
                        // filename and content type is derived from path
                        filename: "profile.jpg",
                        path: photoUrl
                    },
                ],
            };
            const response = yield this.transporter.sendMail(mailOptions);
            return response;
        });
    }
}
exports.EmailGmailService = new Email(config_1.default.GMAIL_NAME, config_1.default.GMAIL_EMAIL, config_1.default.GMAIL_PASSWORD, 465, 'smtp.gmail.com', true);
