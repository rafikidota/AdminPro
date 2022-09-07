interface HospitalUser {
    _id: string;
    name: string;
    img: string;
}
export class Hospital {
    constructor(
        public name: string,
        public id?: string,
        public user?: HospitalUser,
        public img?: string,
    ) { }
}