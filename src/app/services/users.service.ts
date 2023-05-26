import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../common/models/user';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  model = "users";

  constructor(private http: HttpClient) {}

  randomID(){
    return Math.floor(Math.random() * 1000000)
  }

  getUserFromLocalStorage(){
    let rawData: any = localStorage.getItem("userData");
    let convertedData: any = JSON.parse(rawData);
    let objectData: any = convertedData[0];
    return objectData;
  }

  getUserData(data: any) {
    return this.http.get(`http://localhost:3000/users?email=${data.email}&password=${data.password}`, {observe:'response'});
   }

  getUser() {
    let data = this.getUserFromLocalStorage();
    return this.http.get(`http://localhost:3000/users?email=${data.email}&password=${data.password}`, {observe:'response'});
   }

  getUserEmail (user: User) {
  return this.http.get('http://localhost:3000/users?email=' + user.email)
  }
  
  deleteTransaction (data:any, object: any) {
    return this.http.put(`http://localhost:3000/users/${data.id}`, object)
  }

  editUser (user: any, object: any) {
    return this.http.put(`http://localhost:3000/users/${user.id}`, object)
  }

  createUser (user: any) {
   return this.http.post('http://localhost:3000/users', user);
  }
}