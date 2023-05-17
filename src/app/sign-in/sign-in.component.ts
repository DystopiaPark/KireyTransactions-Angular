import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit {
  signupForm!: FormGroup;
  msg = 'No Errors';
  isEmailExists = false;
  
  constructor(private auth: AuthService, private router: Router, private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.signupForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.pattern(/^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*#?&~])[A-Za-z\d@$!%*#?&~]{5,}$/)]],
    });
  }  
  
  // LOGIN
  login() {    
    const email = this.signupForm.get('email')?.value;
    const password = this.signupForm.get('password')?.value;

    if (email.trim().length === 0) {
      this.msg = 'Mail is required';
    } else if (password.trim().length === 0) {
      this.msg = 'Password is required';
    } else {
      let res = this.auth.login(email, password);
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
