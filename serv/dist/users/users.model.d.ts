import { RoleModel } from "../roles/roles.model";
import { MessageModel } from "../message/message.model";
export declare class UserModel {
    id: number;
    login: string;
    email: string;
    password: string;
    firstName?: string;
    lastName?: string;
    isActivated: boolean;
    refreshToken: string;
    roles: Array<RoleModel>;
    messages: Array<MessageModel>;
    friends: Array<UserModel>;
}
