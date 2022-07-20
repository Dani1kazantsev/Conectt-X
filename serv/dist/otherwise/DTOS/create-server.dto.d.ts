import { DirectoriesEntity } from "../../directory/directories.entity";
export declare class CreateServerDto {
    linkToServer?: string;
    readonly avatar?: string;
    readonly name: string;
    readonly type: string;
    readonly directory: DirectoriesEntity;
    readonly userId: number;
}
