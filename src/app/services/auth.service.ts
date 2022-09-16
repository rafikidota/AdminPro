import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { map, catchError, of } from 'rxjs';

import { environment } from 'src/environments/environment';
import { UserResponse } from '../interfaces/user-response.interface';
import { User } from '../models/user.model';
import sweetalert from 'sweetalert2';

declare const google: any;
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  base_url = environment.base_url;
  user = new User('Random User', 'random_user@adminpro.com');

  constructor(
    private http: HttpClient,
    private router: Router,
    private ngZone: NgZone
  ) { }

  get role() {
    return this.user.role!;
  }

  login(email: string, password: string) {
    const url = `${this.base_url}/auth`;
    const body = { email, password };
    return this.http.post<UserResponse>(url, body);
  }

  logout() {
    const email = localStorage.getItem('email');
    if (this.user.google) {
      google.accounts.id.disableAutoSelect();
      google.accounts.id.revoke(email, (done: any) => {
        this.ngZone.run(() => {
          if (done.successful) {
            localStorage.removeItem('token');
            localStorage.removeItem('email');
            localStorage.removeItem('menu');
            localStorage.setItem('logout', 'logout');
            this.router.navigateByUrl('/login');
          } else {
            console.log(done);
            sweetalert.fire('Error', 'Ha ocurrido un error mientras se cerraba su sesión', 'error');
          }
        });
      });
    } else {
      localStorage.removeItem('token');
      localStorage.removeItem('email');
      localStorage.removeItem('menu');
      this.router.navigateByUrl('/login');
    }
  }

  validateToken() {
    const url = `${this.base_url}/auth/token`;
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('token', token || '');
    return this.http.get<UserResponse>(url, { headers }).pipe(
      map(res => {
        this.loadUser(res);
        return res.ok;
      }),
      catchError(err => of(false))
    );
  }

  loadUser(res: UserResponse) {
    localStorage.setItem('token', res.token!);
    localStorage.setItem('menu', JSON.stringify(res.menu!));
    const { name, email, id, role, google, img } = res.user!;
    this.user = new User(name, email, id, role, google, img);
  }

  //Google
  signInWithGoogle(id_token: string) {
    const url = `${this.base_url}/auth/google`;
    const body = { id_token };
    return this.http.post<UserResponse>(url, body).pipe(
      map(res => {
        this.loadUser(res);
        localStorage.setItem('email', res.user?.email!);
        return res.ok;
      }),
      catchError(err => of(false))
    );;
  }

}
