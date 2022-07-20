import { ChannelsEntity } from "../channels/channels.entity";
import { DirectoriesEntity } from "../directory/directories.entity";
export declare class FilesEntity {
    id: number;
    name: string;
    ext: string;
    channel: ChannelsEntity;
    directory: DirectoriesEntity;
}
