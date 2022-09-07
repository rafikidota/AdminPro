import { Hospital } from '../models/hospital.model';

export interface HospitalsResponse {
    ok: boolean,
    msg: string,
    hospitals?:Hospital[],
    total?:number,
}