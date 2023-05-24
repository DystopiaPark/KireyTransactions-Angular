import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../common/models/user';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  model = "users";

  constructor(private http: HttpClient) {}

  getUser(data:any) {
    return this.http.get(`http://localhost:3000/users?email=${data.email}&password=${data.password}`, {observe:'response'});
   }


  getUserEmail (user: User) {
  return this.http.get('http://localhost:3000/users?email=' + user.email)

  }
}