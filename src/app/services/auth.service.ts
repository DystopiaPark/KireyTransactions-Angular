import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private router: Router) {}

  login(mail: string, pword: string) {
    if (mail === 'meu@meu.com' && pword === '!A123') {
      return 200;
    } else {
      return 403;
    }
  }

  logout() {
    this.router.navigate(['login']);
  }
}

// login(incomingMail: string, incomingPassword: string) {
//   array.forEach((el)=> {
//     if(el.mail === incomingMail){
//       if (incomingPassword === el.password){
//         return 200;
//       } else {return 403}

//     } else { return 403}
    
//   })
// }