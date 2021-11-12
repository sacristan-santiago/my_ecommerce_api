import { NextFunction, Request } from "express"
import { EmailGmailService } from "../services/mailservice"
import { UserI } from "../models/usuarios/usuarios.interface"
import Config from "../config"
import moment from "moment"
import { logger } from "../services/logger/logger"
import path from "path"

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

export const registerMail: any = async (req: Request, res: Response, done: NextFunction ) => {
    
    if (req.isAuthenticated()) {
        const userData: any = req.user;
        
        const subject = "nuevo registro";
        const content = JSON.stringify(userData)
       
    
        await EmailGmailService.sendEmail(Config.GMAIL_EMAIL, subject, content)

        logger.info(`nuevo registro: ${userData.email}`)
    }

    done();
}  