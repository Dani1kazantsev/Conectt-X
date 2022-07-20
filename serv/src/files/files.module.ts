import { Module } from '@nestjs/common';
import { FilesService } from './files.service';
import {TypeOrmModule} from "@nestjs/typeorm";
import {FilesEntity} from "./files.entity";

@Module({
  providers: [FilesService],
  imports:[TypeOrmModule.forFeature([FilesEntity])],
  exports: [FilesService]
})
export class FilesModule {}
