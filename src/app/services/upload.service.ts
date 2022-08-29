import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { UploadResponse } from '../interfaces/upload-response.interface';

@Injectable({
  providedIn: 'root'
})
export class UploadService {

  base_url = environment.base_url;

  constructor(
    private http: HttpClient
  ) { }

  updateImage(
    file: File,
    collection: 'doctors' | 'hospitals' | 'users',
    id: string
  ) {
    const url = `${this.base_url}/upload/${collection}/${id}`;
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('token', token || '');
    const formData = new FormData();
    formData.append('image', file, file.name);
    const body = formData;
    return this.http.put<UploadResponse>(url, body, { headers });
  }
  
}
