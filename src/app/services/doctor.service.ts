import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { environment } from 'src/environments/environment';
import { DoctorResponse } from '../interfaces/doctor-response.interface';
import { DoctorsResponse } from '../interfaces/get-doctors.interface';
import { HospitalsResponse } from '../interfaces/get-hospitals.interface';
import { HospitalResponse } from '../interfaces/hospital-response.interface';
import { Doctor } from '../models/doctor.model';
import { Hospital } from '../models/hospital.model';

@Injectable({
  providedIn: 'root'
})
export class DoctorService {

  base_url = environment.base_url;

  constructor(
    private http: HttpClient
  ) { }

  getDoctors(skip: number = 0, limit: number = 0) {
    const url = `${this.base_url}/doctors?skip=${skip}&limit=${limit}`;
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('token', token || '');
    return this.http.get<DoctorsResponse>(url, { headers })
      .pipe(
        map(res => {
          const doctors = res.doctors?.map(doctor => new Doctor(doctor.name, doctor.hospital, doctor.id, doctor.user, doctor.img));
          res.doctors = doctors;
          return res;
        })
      );
  }

  getDoctorByID(id: string) {
    const url = `${this.base_url}/doctors/${id}`;
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('token', token || '');
    return this.http.get<DoctorResponse>(url, { headers })
      .pipe(
        map(res => {
          const doctor = new Doctor(res.doctor?.name!, res.doctor?.hospital!, res.doctor?.id!, res.doctor?.user!, res.doctor?.img!)
          res.doctor = doctor;
          return res;
        })
      );
  }

  create(doctor: { name: string, hospital: string }) {
    const url = `${this.base_url}/doctors`;
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('token', token || '');
    return this.http.post<DoctorResponse>(url, doctor, { headers });
  }

  update(doctor: Doctor) {
    const url = `${this.base_url}/doctors`;
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('token', token || '');
    return this.http.put<DoctorResponse>(url, doctor, { headers });
  }

  delete(doctor: Doctor) {
    const url = `${this.base_url}/doctors/${doctor.id}`;
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('token', token || '');
    return this.http.delete<DoctorResponse>(url, { headers });
  }
}
