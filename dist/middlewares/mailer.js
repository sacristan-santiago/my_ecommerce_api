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
exports.registerMail = void 0;
const mailservice_1 = require("../services/mailservice");
const config_1 = __importDefault(require("../config"));
const logger_1 = require("../services/logger/logger");
// export const loginMail: any = (req: Request, res: Response, done: NextFunction ) => {
//     if (req.isAuthenticated()) {
//         const userData: User = req.user;
//         const subject = "Log in Notification";
//         const content = `<p>Hello ${userData.displayName}. A new login has been registered the following date and time ${moment().format("D.M.YY HH:mm:ss")}
//         .If you don't recognize this activity contact our staff immediately.<p>`
//         EmailEtherealService.sendEmail(Config.ETHEREAL_EMAIL, subject, content)
//         logger.info(`mail sent to: ${Config.ETHEREAL_EMAIL}`)
//     }
//     done();
// }  
// export const logoutMail: any = (req: Request, res: Response, done: NextFunction ) => {
//     if (req.isAuthenticated()) {
//         const userData: User = req.user;
//         const subject = "Log out Notification";
//         const content = `<p>Goodbye ${userData.displayName}! Your account has logged out the following date and time ${moment().format("D.M.YY HH:mm:ss")}<p>`
//         EmailEtherealService.sendEmail(Config.ETHEREAL_EMAIL, subject, content)
//         console.log("mail sent to: ", Config.ETHEREAL_EMAIL)
//     }
//     done();
// }
const registerMail = (req, res, done) => __awaiter(void 0, void 0, void 0, function* () {
    if (req.isAuthenticated()) {
        const userData = req.user;
        const subject = "nuevo registro";
        const content = JSON.stringify(userData);
        yield mailservice_1.EmailGmailService.sendEmail(config_1.default.GMAIL_EMAIL, subject, content);
        logger_1.logger.info(`nuevo registro: ${userData.email}`);
    }
    done();
});
exports.registerMail = registerMail;
