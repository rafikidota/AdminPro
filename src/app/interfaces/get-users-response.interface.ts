import { User } from "../models/user.models";

export interface UsersResponse {
    ok: boolean,
    msg: string,
    users?:User[],
    total?:number,
}