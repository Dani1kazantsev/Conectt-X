import { ServersEntity } from "../servers/servers.entity";
import { FilesEntity } from "../files/files.entity";
import { DirectoriesEntity } from "../directory/directories.entity";
export declare class ChannelsEntity {
    id: number;
    type: string;
    name: string;
    server: ServersEntity;
    files: FilesEntity[];
    directories: DirectoriesEntity[];
}
