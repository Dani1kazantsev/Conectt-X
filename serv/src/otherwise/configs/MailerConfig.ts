import {ConfigModule, ConfigService} from "@nestjs/config";
import {join} from "path";
import {HandlebarsAdapter} from "@nestjs-modules/mailer/dist/adapters/handlebars.adapter";


export const MailerConfig = async (config: ConfigService) => {
        return {
            imports: [ConfigModule],
            inject:[ConfigService],
            transport: {
                host: config.get('EMAIL_HOST'),
                port: config.get('EMAIL_PORT'),
                secure: false,
                auth: {
                    user: config.get('EMAIL_USER'),
                    pass: config.get('EMAIL_PASSWORD'),
                },
                redirect:{
                    url:''
                }
            },
            template: {
                dir: join(__dirname, './templates'),
                adapter: new HandlebarsAdapter(),
                options: {
                    strict: true
                }
            }
        }
    }