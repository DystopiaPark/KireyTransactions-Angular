import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent {
  @Input() modal!: boolean;
  name = ""
  email = "";
  password = "";
  amount: number = 0;
  modalHeader = "Sign Up"
  closeModal(){
    this.modal = !this.modal;
  }
  registerUser () {}
}
