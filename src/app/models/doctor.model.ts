import { HospitalUser } from "./hospital.model";

interface DoctorUser {
    _id: string;
    name: string;
    img: string;
}
interface DoctorHospital {
    _id: string;
    name: string;
    user: HospitalUser;
    img: string;
}
export class Doctor {
    constructor(
        public name: string,
        public id?: string,
        public user?: DoctorUser,
        public hospital?: DoctorHospital,
        public img?: string,
    ) { }
}