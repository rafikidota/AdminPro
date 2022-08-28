import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, catchError, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { UserResponse } from '../interfaces/user-response.interface';
import { User } from '../models/user.models';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  base_url = environment.base_url;
  _user!: User;

  constructor(
    private http: HttpClient
  ) { }

  login(email: string, password: string) {
    const url = `${this.base_url}/auth`;
    const body = { email, password };
    return this.http.post<UserResponse>(url, body);
  }

  logout(){
    localStorage.removeItem('token');
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
    this._user = res.user!;
  }

  //Google
  signInWithGoogle() {
    const url = `${this.base_url}/auth/google`;
    const id_token = localStorage.getItem('id_token');
    const body = { id_token };
    return this.http.post<UserResponse>(url, body).pipe(
      map(res => {
        this.loadUser(res);
        localStorage.removeItem('id_token');
        return res.ok;
      }),
      catchError(err => of(false))
    );;
  }

}
