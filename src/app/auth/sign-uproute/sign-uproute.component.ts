import { Component } from '@angular/core';
import { UsersService } from 'src/app/services/users.service';
import { User } from 'src/app/common/models/user';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-sign-uproute',
  templateUrl: './sign-uproute.component.html',
  styleUrls: ['./sign-uproute.component.scss']
})
export class SignUprouteComponent {
  emailExists = false;

  constructor(private usersService: UsersService, private formBuilder: FormBuilder, private http: HttpClient) {}
signupForm!: FormGroup;

  modalHeader = "Sign Up"

  ngOnInit(): void {
    this.signupForm = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.pattern(/^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*#?&~])[A-Za-z\d@$!%*#?&~]{5,}$/)]],
      accountAmount: ['', Validators.required]

    });
  }  

  randomID(){
    return Math.floor(Math.random() * 1000000)
  }

  registerUser () {
    const newUser: User = this.signupForm.value;
    newUser.id = this.randomID();
    this.usersService.getUserEmail(newUser).subscribe(
      (response: Object) => { 
        if (Object.keys(response).length > 0) {
          console.error('Email already exists in the database.');
          alert(`${newUser.email} already exists in the database!`)
        } else {
          this.usersService.createUser(newUser)
            .subscribe(
              response => {
                this.signupForm.reset();
                console.log('User created successfully:', response);
              },
              error => {
                console.error('Error creating user:', error);
              }
            );
        }
      },
      error => {
        console.error('Error checking email in the database:', error);
      }
    );
  }
}


