import { Component, EventEmitter, Input, Output } from '@angular/core';
import { UsersService } from 'src/app/services/users.service';
import { User } from 'src/app/common/models/user';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { passwordPattern } from 'src/app/common/constants/passwordPattern';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent {
  emailExists:boolean = false;
  signupForm!: FormGroup;

  modalHeader:string = "Sign Up"

  constructor(private usersService: UsersService, private formBuilder: FormBuilder) {}


  ngOnInit(): void {
    this.signupForm = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.pattern(passwordPattern)]],
      accountAmount: ['', Validators.required]
    });
  }  
  

  
  registerUser () {
    const newUser: User = this.signupForm.value;
    newUser.id = this.usersService.randomID();
    this.usersService.getUserThroughEmail(newUser).subscribe(
      (response: Object) => { 
        if (Object.keys(response).length > 0) {
          console.error('Email already exists in the database.');
          this.emailExists = true;
          setTimeout(()=> {
            this.emailExists = false;
          }, 1000)
        } else {
          this.usersService.createUser(newUser)
            .subscribe(
              response => {
                console.log('User created successfully:', response);
                this.signupForm.reset();
                this.closeModal();
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

  // MODAL

  @Input() modalOpen = false;
  @Output() modalClosed = new EventEmitter<void>();
  closeModal(): void {
    this.modalClosed.emit();
  }
}
