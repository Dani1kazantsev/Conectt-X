import { MailerService } from "@nestjs-modules/mailer";
import { Injectable } from "@nestjs/common";
import {UsersService} from "../users/users.service";
import {UsersEntity} from "../users/users.entity";
import {mergeConfigObject} from "@nestjs/config/dist/utils/merge-configs.util";

@Injectable()
export class MailService {
    constructor(private mailerService: MailerService,
    ) {}

    async sendMail(toEmail:string,link:string,name:string) {
        try {
            return await this.mailerService.sendMail({
                to: toEmail,
                subject: 'Greeting from NestJS NodeMailer',
                template: './src/templates/email',
                context: {
                    link: `${process.env.API_URL}/auth/activate/${link}`,
                    name:name
                },

            })
        }catch (e){
            return e
        }
    }
}