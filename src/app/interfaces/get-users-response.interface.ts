import { User } from "../models/user.model";

export interface UsersResponse {
    ok: boolean,
    msg: string,
    users?:User[],
    total?:number,
}