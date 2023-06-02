import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(private http: HttpClient) {}

  getLoginData(data: any) {
    console.log(data.email);
    
    return this.http.get(`http://localhost:3000/admins?email=${data.email}&password=${data.password}`, {observe:'response'});
  }
}
