import { CreateRolesDto } from "../otherwise/DTOS/create-roles.dto";
import { RolesService } from "./roles.service";
import { RoleEntity } from "./roles.entity";
export declare class RolesController {
    private rolesService;
    constructor(rolesService: RolesService);
    create(rolesDto: CreateRolesDto): Promise<CreateRolesDto & RoleEntity>;
    getAll(): Promise<RoleEntity[]>;
}
