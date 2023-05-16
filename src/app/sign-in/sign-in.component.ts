import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit {
  email = '';
  password = '';
  msg = 'No Errors';
  constructor(private auth: AuthService, private router: Router) {}

  ngOnInit(): void {}
  // LOGIN
  login() {    
    if (this.email.trim().length === 0) {
      this.msg = 'Mail is required';
    } else if (this.password.trim().length === 0) {
      this.msg = 'Password is required';
    } else {
      let res = this.auth.login(this.email, this.password);
      if (res === 200) {
        this.msg = "Successful Login!"
        this.router.navigate(['home']);
      }
      if (res === 403) {
        this.msg = 'Invalid Credentials';
      }
    }

    alert(this.msg)
  }
  // MODAL
  displayModal: boolean = false;


  showModal() {
    this.displayModal = !this.displayModal;
    console.log(this.displayModal);
    
  }


}
