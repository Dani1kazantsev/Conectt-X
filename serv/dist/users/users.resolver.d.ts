import { UsersService } from "./users.service";
export declare class UsersResolver {
    private readonly userService;
    constructor(userService: UsersService);
    getUsers(): Promise<import("./users.entity").UsersEntity[]>;
    getUserById(id: number): Promise<import("./users.entity").UsersEntity>;
    setRole(roleName: string, userId: number): Promise<import("./users.entity").UsersEntity>;
    addNewFriend(myId: number, userId: number): Promise<import("./users.entity").UsersEntity>;
}
