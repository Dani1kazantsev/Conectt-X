import { MailerService } from "@nestjs-modules/mailer";
export declare class MailService {
    private mailerService;
    constructor(mailerService: MailerService);
    sendMail(toEmail: string, link: string, name: string): Promise<any>;
}
