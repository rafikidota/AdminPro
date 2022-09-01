import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs';

import { environment } from 'src/environments/environment';
import { UserResponse } from '../interfaces/user-response.interface';
import { User } from '../models/user.model';
import { UsersResponse } from '../interfaces/get-users-response.interface';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  base_url = environment.base_url;

  constructor(
    private http: HttpClient
  ) { }

  register(user: User) {
    const url = `${this.base_url}/users`;
    return this.http.post<UserResponse>(url, user);
  }
  update(user: User) {
    const url = `${this.base_url}/users`;
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('token', token || '');
    return this.http.put<UserResponse>(url, user, { headers });
  }
  getUsers(skip: number = 0,limit: number = 0) {
    const url = `${this.base_url}/users?skip=${skip}&limit=${limit}`;
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('token', token || '');
    return this.http.get<UsersResponse>(url, { headers })
                    .pipe(
                      map( res =>{
                        const users = res.users?.map( user => new User(user.name,user.email,user.id,user.role,user.google,user.img,''));
                        res.users = users;
                        return res;
                      })
                    );
  }
}
