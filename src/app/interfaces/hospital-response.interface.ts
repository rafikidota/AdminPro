import { Hospital } from '../models/hospital.model';

export interface HospitalResponse {
    ok: boolean,
    msg: string,
    hospital?:Hospital,
}