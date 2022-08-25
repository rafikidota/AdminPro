export class User {
    constructor(
        public name: string,
        public email: string,
        public google?: boolean,
        public id?: string,
        public img?: string,
        public password?: string,
        public role?: string,
    ) { }
}