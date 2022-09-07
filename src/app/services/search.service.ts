import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { environment } from 'src/environments/environment';
import { FindAllResponse } from '../interfaces/find-all-response.interface';
import { FindByCollectionResponse } from '../interfaces/find-by-collection.interface';
import { map } from 'rxjs';
import { User } from '../models/user.model';
import { Doctor } from '../models/doctor.model';
import { Hospital } from '../models/hospital.model';

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  base_url = environment.base_url;

  constructor(
    private http: HttpClient
  ) { }

  searchByCollection(
    collection: 'doctors' | 'hospitals' | 'users',
    query: string
  ) {
    const url = `${this.base_url}/search/${collection}/?query=${query}`;
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('token', token || '');
    return this.http.get<FindByCollectionResponse>(url, { headers })
      .pipe(
        map(res => {
          switch (res.collection!) {
            case 'doctors':
              const doctors = res.data!
                .map(doctor => {
                  const user = new User(
                    doctor.user.name,
                    doctor.user.email,
                    doctor.user.id,
                    doctor.user.role,
                    doctor.user.google,
                    doctor.user.img,
                    '');
                  const hospital = new Hospital(doctor.hospital.name, doctor.hospital.img, doctor.hospital.user);
                  return new Doctor(doctor.name, doctor.img, user, hospital)
                });
              res.data = doctors;
              break;
            case 'hospitals':
              const hospitals = res.data!.map(hospital => new Hospital(hospital.name, hospital.email, hospital.user));
              res.data = hospitals;
              break;
            case 'users':
              const users = res.data!.map(user => new User(user.name, user.email, user.id, user.role, user.google, user.img, ''));
              res.data = users;
              break;
            default:
              break;
          }
          return res;
        })
      );
  }

  search(query: string) {
    const url = `${this.base_url}/search?query=${query}`;
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('token', token || '');
    return this.http.get<FindAllResponse>(url, { headers });
  }
}
