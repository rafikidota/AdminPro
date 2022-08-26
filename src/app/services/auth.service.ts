import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { UserResponse } from '../interfaces/user-response.interface';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  base_url = environment.base_url;
  
  constructor(
    private http: HttpClient
  ) { }

  login(email: string, password: string) {
    const url = `${this.base_url}/auth`;
    const body = { email, password };
    return this.http.post<UserResponse>(url, body);
  }
}
