import { DirectoriesEntity } from "./directories.entity";
import { Repository } from "typeorm";
export declare class DirectoriesService {
    private directoriesRepository;
    constructor(directoriesRepository: Repository<DirectoriesEntity>);
    getDirectoryByPath(path: string): Promise<DirectoriesEntity>;
    getDirectoryById(id: number): Promise<DirectoriesEntity>;
    saveDirectoryWithPath(name: string, path: string): Promise<{
        name: string;
        path: string;
    } & DirectoriesEntity>;
    saveDirectory(name: string, directory: DirectoriesEntity, channelId?: number): Promise<{
        name: string;
        path: string;
    } & DirectoriesEntity>;
}
