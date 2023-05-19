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
  }
  )
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

// userLogin(incomingMail:string, incomingPassword:string) {
//   return new Promise((resolve, reject) => {
//     const object = this.users.find(incomingMail);
//     if (object) {
//       object.subscribe((data: any) => {
//         const realPassword = data[0]?.password;
//         if (incomingPassword === realPassword) {
//           resolve(200);
//         } else {
//           console.log("Mail doesn't exist or password is incorrect");
//           reject(403);
//         }
//       });
//     } else {
//       console.log("Object not found");
//       reject(403);
//     }
//   });
// }

  // getUserObject(incomingMail:string) {
  //   const object = this.users.find(incomingMail);
  //   object.subscribe((data: any) => {
  //     const userObject = data[0];
  //     console.log(userObject);
  //     return userObject;
      
  // })}