import {Module} from '@nestjs/common';
import {ChannelsService} from "./channels.service";
import {ChannelsController} from "./channels.controller";
import {TypeOrmModule} from "@nestjs/typeorm";
import {ChannelsEntity} from "./channels.entity";
import {ServersModule} from "../servers/servers.module";
import {FilesModule} from "../files/files.module";
import {FilesEntity} from "../files/files.entity";
import {TokensModule} from "../tokens/tokens.module";
import {DirectoriesModule} from "../directory/directories.module";

@Module({
    providers: [ChannelsService],
    controllers: [ChannelsController],
    imports: [TypeOrmModule.forFeature([ChannelsEntity]), ServersModule,
        FilesModule, TokensModule, DirectoriesModule],
    exports: [ChannelsService]
})
export class ChannelsModule {
}
