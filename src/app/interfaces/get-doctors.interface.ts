import { Doctor } from "../models/doctor.model";

export interface DoctorsResponse {
    ok: boolean,
    msg: string,
    doctors?:Doctor[],
    total?:number,
}