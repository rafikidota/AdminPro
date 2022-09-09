import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { environment } from 'src/environments/environment';
import { HospitalsResponse } from '../interfaces/get-hospitals.interface';
import { HospitalResponse } from '../interfaces/hospital-response.interface';
import { Hospital } from '../models/hospital.model';

@Injectable({
  providedIn: 'root'
})
export class HospitalService {

  base_url = environment.base_url;

  constructor(
    private http: HttpClient
  ) { }

  getHospitals(skip: number = 0, limit: number = 0) {
    const url = `${this.base_url}/hospitals?skip=${skip}&limit=${limit}`;
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('token', token || '');
    return this.http.get<HospitalsResponse>(url, { headers })
      .pipe(
        map(res => {
          const hospitals = res.hospitals?.map(hospital => new Hospital(hospital.name, hospital.id, hospital.user, hospital.img));
          res.hospitals = hospitals;
          return res;
        })
      );
  }

  create(hospital: Hospital) {
    const url = `${this.base_url}/hospitals`;
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('token', token || '');
    return this.http.post<HospitalResponse>(url, hospital, { headers });
  }

  update(hospital: Hospital) {
    const url = `${this.base_url}/hospitals`;
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('token', token || '');
    return this.http.put<HospitalResponse>(url, hospital, { headers });
  }

  delete(hospital: Hospital) {
    const url = `${this.base_url}/hospitals/${hospital.id}`;
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('token', token || '');
    return this.http.delete<HospitalResponse>(url, { headers });
  }
}
