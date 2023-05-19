import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { User } from '../common/models/user';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit {
  signupForm!: FormGroup;
  emailExists = false;
  constructor(private auth: AuthService, private router: Router, private formBuilder: FormBuilder, private http: HttpClient) {}

  ngOnInit(): void {
    this.signupForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.pattern(/^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*#?&~])[A-Za-z\d@$!%*#?&~]{5,}$/)]],
    });
  }  
  
  // LOGIN
  login(data:any) {
    this.auth.userLogin(data);
  }

  
  // MODAL

  modalOpen = false;

  @Output() modalClosed = new EventEmitter<void>();

  openModal(): void {
    this.modalOpen = true;
  }

  closeModal(): void {
    this.modalOpen = false;
  }

}
  // async login() {  
  //   // const email  = this.signupForm.get('email')?.value;
  //   // const password = this.signupForm.get('password')?.value;
  //   const loginUser: User = this.signupForm.value;
  //   const email  = loginUser.email;
  //   const password = loginUser.password;
  //   try {
  //   let res = await this.auth.userLogin(email, password);
  //   if (res === 200) {
  //     const userObject = this.auth.getUserObject(email);
  //     console.log(userObject);      
  //     this.router.navigate(['home']);
  //   } else if (res === 403) {
  //   }} catch (error) {
  //     console.log('Login failed:', error);
  //   }
  // }