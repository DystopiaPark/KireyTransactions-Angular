import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private isAuthenticated = new BehaviorSubject(this.getIsAuthenticated() || false);
  isAuthenticated$ = this.isAuthenticated.asObservable();

    constructor(private router: Router, private http: HttpClient) {}


  private getIsAuthenticated(): boolean {
    console.log("Got authentication");
    console.log();
    
    return JSON.parse(localStorage.getItem("auth")!);
  }


  userLogin(data:any) {
    this.http.get(`http://localhost:3000/users?email=${data.email}&password=${data.password}`, {observe:'response'}).subscribe((value:any) => { 
      if (value && value.body.length === 1) {
          localStorage.setItem("userData", JSON.stringify(value.body))
          localStorage.setItem("auth" , JSON.stringify(this.isAuthenticated));
          this.isAuthenticated.next(true);
          this.router.navigateByUrl('/home');
      }else {
        alert("Email doesn't exist or your password is wrong")
      }
    }, err => {
      alert("something went wrong try again")
    })
  }
}