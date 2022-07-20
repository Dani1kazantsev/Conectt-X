"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const swagger_1 = require("@nestjs/swagger");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
async function start() {
    const PORT = Number(process.env.PORT) || 3306;
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.use(cookieParser());
    app.enableCors({
        origin: process.env.CLIENT_URL,
        methods: 'GET,HEAD,POST,PUT',
        credentials: true
    });
    app.use(bodyParser.json({ limit: '50mb' }));
    app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
    const config = new swagger_1.DocumentBuilder()
        .setTitle('Conectt')
        .setDescription('Продвинутый мессенджер со своим редактором кода')
        .setVersion('1.0.0')
        .addTag('')
        .build();
    const document = swagger_1.SwaggerModule.createDocument(app, config);
    swagger_1.SwaggerModule.setup('api/docs', app, document);
    await app.listen(PORT, () => { console.log(`Сервер запущен на порте ${PORT}`); });
}
start();
//# sourceMappingURL=main.js.map