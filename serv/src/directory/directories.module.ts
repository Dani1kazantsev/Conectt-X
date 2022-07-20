import { Module } from '@nestjs/common';
import { DirectoriesService } from './directories.service';
import {TypeOrmModule} from "@nestjs/typeorm";
import {DirectoriesEntity} from "./directories.entity";

@Module({
  providers: [DirectoriesService],
  imports:[TypeOrmModule.forFeature([DirectoriesEntity])],
  exports:[DirectoriesService]
})
export class DirectoriesModule {}
