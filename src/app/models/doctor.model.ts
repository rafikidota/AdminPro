import { HospitalUser } from "./hospital.model";

interface DoctorUser {
    _id: string;
    name: string;
    img: string;
}
export interface DoctorHospital {
    _id: string;
    name: string;
    user: HospitalUser;
    img: string;
}
export class Doctor {
    constructor(
        public name: string,
        public hospital?: DoctorHospital,
        public id?: string,
        public user?: DoctorUser,
        public img?: string,
    ) { }
}