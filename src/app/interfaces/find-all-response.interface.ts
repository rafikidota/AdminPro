import { Doctor } from "../models/doctor.model";
import { Hospital } from "../models/hospital.model";
import { User } from "../models/user.model";

export interface FindAllResponse {
    ok: boolean,
    msg: string,
    doctors?:Doctor[],
    hospitals?:Hospital[],
    users?:User[],
}