import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { UsersService } from './users.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private router: Router, private users: UsersService) {}

  userLogin(incomingMail:string, incomingPassword:string) {
    return new Promise((resolve, reject) => {
      const object = this.users.find(incomingMail);
      if (object) {
        object.subscribe((data: any) => {
          const realPassword = data[0]?.password;
          if (incomingPassword === realPassword) {
            resolve(200);
          } else {
            console.log("Mail doesn't exist or password is incorrect");
            reject(403);
          }
        });
      } else {
        console.log("Object not found");
        reject(403);
      }
    });
  }

  getUserObject(incomingMail:string) {
    const object = this.users.find(incomingMail);
    object.subscribe((data: any) => {
      const userObject = data[0];
      console.log(userObject);
      return userObject;
      
  })}

  logout() {
    this.router.navigate(['login']);
  }
}




// setUser(user: any): void {
//   localStorage.setItem('user', JSON.stringify(user));
// }

// getUser(): any {
//   const user = localStorage.getItem('user');
//   return user ? JSON.parse(user) : null;
// }

// removeUser(): void {
//   localStorage.removeItem('user');
// }