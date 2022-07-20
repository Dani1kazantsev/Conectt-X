"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MailerConfig = void 0;
const config_1 = require("@nestjs/config");
const path_1 = require("path");
const handlebars_adapter_1 = require("@nestjs-modules/mailer/dist/adapters/handlebars.adapter");
const MailerConfig = async (config) => {
    return {
        imports: [config_1.ConfigModule],
        inject: [config_1.ConfigService],
        transport: {
            host: config.get('EMAIL_HOST'),
            port: config.get('EMAIL_PORT'),
            secure: false,
            auth: {
                user: config.get('EMAIL_USER'),
                pass: config.get('EMAIL_PASSWORD'),
            },
            redirect: {
                url: ''
            }
        },
        template: {
            dir: (0, path_1.join)(__dirname, './templates'),
            adapter: new handlebars_adapter_1.HandlebarsAdapter(),
            options: {
                strict: true
            }
        }
    };
};
exports.MailerConfig = MailerConfig;
//# sourceMappingURL=MailerConfig.js.map