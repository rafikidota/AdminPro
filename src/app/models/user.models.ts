export class User {
    constructor(
        public name: string,
        public email: string,
        public id?: string,
        public role?: string,
        public google?: boolean,
        public img?: string,
        public password?: string,
    ) { }
}