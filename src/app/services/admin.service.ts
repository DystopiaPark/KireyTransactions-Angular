import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(private http: HttpClient) {}

  getLoginData(data: any) {
    return this.http.get(`http://localhost:3000/admins?email=admin@admin&password=!A123`, {observe:'response'});
  }
}
