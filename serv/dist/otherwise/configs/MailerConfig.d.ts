import { ConfigModule, ConfigService } from "@nestjs/config";
import { HandlebarsAdapter } from "@nestjs-modules/mailer/dist/adapters/handlebars.adapter";
export declare const MailerConfig: (config: ConfigService) => Promise<{
    imports: (typeof ConfigModule)[];
    inject: (typeof ConfigService)[];
    transport: {
        host: any;
        port: any;
        secure: boolean;
        auth: {
            user: any;
            pass: any;
        };
        redirect: {
            url: string;
        };
    };
    template: {
        dir: string;
        adapter: HandlebarsAdapter;
        options: {
            strict: boolean;
        };
    };
}>;
