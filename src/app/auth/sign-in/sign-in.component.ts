import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit {
  signupForm!: FormGroup;
  emailExists = false;
  constructor(private auth: AuthService, private router: Router, private formBuilder: FormBuilder, private http: HttpClient, private usersService: UsersService) {}

  ngOnInit(): void {
    this.signupForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.pattern(/^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*#?&~])[A-Za-z\d@$!%*#?&~]{5,}$/)]],
    });
  }  
  
  // LOGIN
  login(data:any) {
    let receivedData = this.usersService.getUser(data);
    receivedData.subscribe((value:any) => { 
      if (value && value.body.length === 1) {
          localStorage.setItem("userData", JSON.stringify(value.body))
          let concreteUser = value.body[0];
          delete concreteUser.transactions;
          let newBody = [concreteUser];
          localStorage.setItem("currUser", JSON.stringify(newBody));
          localStorage.setItem("auth", JSON.stringify(this.auth.isAuthenticated));
          this.auth.isAuthenticated.next(true);
          this.router.navigateByUrl('/main/homepage');
      } else {
        alert("Email doesn't exist or your password is wrong")
      }
    }, err => {
      alert("something went wrong try again")
    })
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