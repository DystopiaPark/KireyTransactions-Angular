import { Component, EventEmitter, Input, Output } from '@angular/core';
import { UsersService } from 'src/app/services/users.service';
import { User } from 'src/app/common/models/user';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent {
constructor(private usersService: UsersService) {}

  modalHeader = "Sign Up"

  user: User = {
    name: "",
    email: "",
    password: "",
    amount: 0,
    id: 0,
  }
  registerUser () {
    this.usersService.create(this.user);
    this.closeModal();
  }

  // MODAL

  @Input() modalOpen = false;
  @Output() modalClosed = new EventEmitter<void>();
  closeModal(): void {
    this.modalClosed.emit();
  }

 
}
