export class User {
    constructor(
        public name: string,
        public email: string,
        public password?: string,
        public google?: boolean,
        public id?: string,
        public img?: string,
        public role?: string,
    ) { }
}