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
        if (this.img?.includes('https' || 'http')) {
            return this.img;
        }
        if (this.img) {
            return `${base_url}/upload/users/${this.img}`;
        } else {
            return `${base_url}/upload/users/no-image`;
        }
    }
}