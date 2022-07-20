import { Repository } from "typeorm";
import { RoleEntity } from "./roles.entity";
import { CreateRolesDto } from "../otherwise/DTOS/create-roles.dto";
export declare class RolesService {
    private roleRepository;
    constructor(roleRepository: Repository<RoleEntity>);
    createRole(dto: CreateRolesDto): Promise<CreateRolesDto & RoleEntity>;
    getRoles(): Promise<RoleEntity[]>;
    findRoleByValue(value: string): Promise<RoleEntity>;
}
