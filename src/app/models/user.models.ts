import { environment } from 'src/environments/environment';
const base_url = environment.base_url;
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

    get imageURL() {
        if (this.img) {
            const url = `${base_url}/uploads/users/${this.img}`;
            return url;
        }
        return `${base_url}/uploads/users/no-image`;
    }
}