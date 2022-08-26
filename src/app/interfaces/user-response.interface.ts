import { User } from "../models/user.models";

export interface UserResponse {
    ok: boolean,
    msg: string,
    user?:User,
    token?:string,
}