import {NestFactory} from "@nestjs/core";
import {AppModule} from "./app.module";
import {DocumentBuilder, SwaggerModule} from "@nestjs/swagger";
import * as cookieParser from 'cookie-parser';

async function start(){
    const PORT:number = Number(process.env.PORT) || 3306;
    const app = await NestFactory.create(AppModule);
    app.use(cookieParser())
    const config = new DocumentBuilder()
        .setTitle('Conectt')
        .setDescription('Продвинутый мессенджер со своим редактором кода')
        .setVersion('1.0.0')
        .addTag('')
        .build()
    const document = SwaggerModule.createDocument(app,config)
    SwaggerModule.setup('api/docs',app,document)
    await app.listen(PORT,()=>{console.log(`Сервер запущен на порте ${PORT}`)})
}

start()