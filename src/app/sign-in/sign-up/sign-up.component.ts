import { Component, Input } from '@angular/core';
import { UsersService } from 'src/app/services/users.service';
import { User } from 'src/app/common/models/user';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent {
constructor(private usersService: UsersService) {}

  @Input() modal!: boolean;
  modalHeader = "Sign Up"

  user: User = {
    name: "",
    email: "",
    password: "",
    amount: 0,
    id: 0,
  }

  closeModal(){
    this.modal = !this.modal;
    
  }

  registerUser () {
    this.usersService.create(this.user);
    this.modal = !this.modal;
  }
}
