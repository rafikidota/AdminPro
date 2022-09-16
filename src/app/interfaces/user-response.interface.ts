import { User } from "../models/user.model";
import { Menu } from "./menu.interface";

export interface UserResponse {
    ok: boolean,
    msg: string,
    user?:User,
    token?:string,
    menu?: Menu[]
}