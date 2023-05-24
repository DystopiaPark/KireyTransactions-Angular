import { Component } from '@angular/core';
import { UsersService } from 'src/app/services/users.service';
import { User } from 'src/app/common/models/user';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-uproute',
  templateUrl: './sign-uproute.component.html',
  styleUrls: ['./sign-uproute.component.scss']
})
export class SignUprouteComponent {
  emailExists = false;

  constructor(private usersService: UsersService, private formBuilder: FormBuilder, private router: Router) {}
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

  registerUser () {
    const newUser: User = this.signupForm.value;
    this.usersService.create(newUser);
    this.router.navigateByUrl("/auth/signin");
  }
}


