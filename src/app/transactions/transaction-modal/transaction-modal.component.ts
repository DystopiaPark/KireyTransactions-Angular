import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-transaction-modal',
  templateUrl: './transaction-modal.component.html',
  styleUrls: ['./transaction-modal.component.scss']
})
export class TransactionModalComponent {
  @Input() modal!: boolean;
  purchase!: string;
  category!: string;
  timeAndDate!: Date;
  spent!: number;
  modalHeader = "Sign Up"
  closeModal(){
    this.modal = !this.modal;
  }
  addTransaction() {}
}
