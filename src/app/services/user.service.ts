import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { UserResponse } from '../interfaces/user-response.interface';
import { User } from '../models/user.models';

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
  
}
