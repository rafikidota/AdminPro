import { Doctor } from "../models/doctor.model";

export interface DoctorResponse {
    ok: boolean,
    msg: string,
    doctor?:Doctor,
}