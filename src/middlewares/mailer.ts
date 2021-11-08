import { NextFunction, Request } from "express"
import { EmailEtherealService, EmailGmailService } from "../services/mailservice"
import { User } from "../routes/userlog"
import Config from "../config"
import moment from "moment"
import { logger } from "../services/logger/logger"
import path from "path"

export const loginMail: any = (req: Request, res: Response, done: NextFunction ) => {
    if (req.isAuthenticated()) {
        const userData: User = req.user;

        const subject = "Log in Notification";
        const content = `<p>Hello ${userData.displayName}. A new login has been registered the following date and time ${moment().format("D.M.YY HH:mm:ss")}
        .If you don't recognize this activity contact our staff immediately.<p>`
       
    
        EmailEtherealService.sendEmail(Config.ETHEREAL_EMAIL, subject, content)

        logger.info(`mail sent to: ${Config.ETHEREAL_EMAIL}`)
    }

    done();
}  

export const logoutMail: any = (req: Request, res: Response, done: NextFunction ) => {
    
    if (req.isAuthenticated()) {
        const userData: User = req.user;
        
        const subject = "Log out Notification";
        const content = `<p>Goodbye ${userData.displayName}! Your account has logged out the following date and time ${moment().format("D.M.YY HH:mm:ss")}<p>`
    
        EmailEtherealService.sendEmail(Config.ETHEREAL_EMAIL, subject, content)

        console.log("mail sent to: ", Config.ETHEREAL_EMAIL)
    }

    done();
}

export const loginGmailMail: any = async (req: Request, res: Response, done: NextFunction ) => {
    
    if (req.isAuthenticated()) {
        const userData: User = req.user;
        let email = "noMail";
        let foto = "noPhoto"

        if (userData.emails) email = userData.emails[0].value;
        if (userData.photos) foto = userData.photos[0].value;

        const subject = "Log in Notification";
        const content = `<p>Hello ${userData.displayName}. A new login has been registered the following date and time ${moment().format("D.M.YY HH:mm:ss")}
        .If you don't recognize this activity contact our staff immediately.<p>`
       
    
        await EmailGmailService.sendEmail(email, subject, content, foto)

        logger.info(`mail sent to: ${email}`)
    }

    done();
}  