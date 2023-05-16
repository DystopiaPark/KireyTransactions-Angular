import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-amount',
  templateUrl: './amount.component.html',
  styleUrls: ['./amount.component.scss']
})
export class AmountComponent {
  @Input() modal!: boolean;

  amount!: number;
  modalHeader = "Set new amount"
  closeModal(){
    this.modal = !this.modal;
  }
  registerUser () {}
}
