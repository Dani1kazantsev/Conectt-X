import { MailerService } from "@nestjs-modules/mailer";
import { Injectable } from "@nestjs/common";
import {UsersService} from "../users/users.service";
import {UserEntity} from "../users/users.entity";

@Injectable()
export class MailService {
    constructor(private mailerService: MailerService,
    ) {}

    async sendMail(toEmail:string,link:string,name:string) {
        return await this.mailerService.sendMail({
            to: toEmail,
            subject: 'Greeting from NestJS NodeMailer',
            template: './src/templates/email',
            context: {
                link: `${process.env.API_URL}/auth/activate/${link}`,
                name:name
            },

        })
    }
}