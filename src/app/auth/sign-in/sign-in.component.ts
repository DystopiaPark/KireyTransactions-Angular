import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { UsersService } from 'src/app/services/users.service';
import { passwordPattern } from 'src/app/common/constants/passwordPattern';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit {
  @Output() modalClosed = new EventEmitter<void>();

  modalOpen: boolean = false;
  signinForm!: FormGroup;
  invalidCredentials:boolean = false;

  constructor(private auth: AuthService, private router: Router, private formBuilder: FormBuilder, private usersService: UsersService) {}

  ngOnInit(): void {
    this.signinForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.pattern(passwordPattern)]],
    });
  }  
  
  // LOGIN
  login(userLoginData:any) {
    this.usersService.getUserData(userLoginData).subscribe((response:any) => { 
      if (response && response.body.length === 1) {
          localStorage.setItem("userData", JSON.stringify(response.body))
          localStorage.setItem("auth", JSON.stringify(this.auth.isAuthenticated));
          this.auth.isAuthenticated.next(true);
          this.router.navigateByUrl('/main/homepage');
      } else {
        this.invalidCredentials = true;
        setTimeout(()=> {
          this.invalidCredentials = false;
        }, 1500)
      }
    }, err => {
      alert("something went wrong try again")
    })
  }

  openModal(): void {
    this.modalOpen = true;
  }
  
  closeModal(): void {
    this.modalOpen = false;
  }
}