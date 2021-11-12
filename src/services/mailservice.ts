import Config from '../config';
import nodemailer from 'nodemailer';
import { Url } from 'url';
import { profile } from 'console';

class Email {
  private owner: any;
  private transporter;

  constructor(name: string, senderMail: string, password: string, port: number, host: string, secure: boolean = false) {
    this.owner = {
      name: name,
      address: senderMail,
    };

    this.transporter = nodemailer.createTransport({
      host: host,
      port: port,
      secure: secure,
      auth: {
        user: senderMail,
        pass: password,
      },
    });

    this.transporter.verify().then(() => console.log('READY To Send Email'));
  }

  async sendEmail(dest: string, subject: string, content: string, photoUrl: string = "") {
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

    const response = await this.transporter.sendMail(mailOptions);
    return response;
  }
}

export const EmailGmailService = new Email(Config.GMAIL_NAME
    , Config.GMAIL_EMAIL
    , Config.GMAIL_PASSWORD
    , 465
    , 'smtp.gmail.com'
    , true);