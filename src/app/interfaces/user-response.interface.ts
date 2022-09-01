import { User } from "../models/user.model";

export interface UserResponse {
    ok: boolean,
    msg: string,
    user?:User,
    token?:string,
}