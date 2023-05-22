import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { UsersService } from './users.service';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private router: Router, private users: UsersService, private http: HttpClient) {}

  userLogin(data:any) {
    this.http.get(`http://localhost:3000/users?email=${data.email}&password=${data.password}`, {observe:'response'}).subscribe((value:any) => { 
      if (value && value.body.length === 1) {
        localStorage.setItem("userData", JSON.stringify(value.body))
        this.router.navigate(["home"])
      }else {
        alert("Email doesn't exist or your password is wrong")
      }
    }, err => {
      alert("something went wrong try again")
    })
  }
}