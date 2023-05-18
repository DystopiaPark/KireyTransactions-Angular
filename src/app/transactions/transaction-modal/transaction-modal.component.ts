import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-transaction-modal',
  templateUrl: './transaction-modal.component.html',
  styleUrls: ['./transaction-modal.component.scss']
})
export class TransactionModalComponent {
  purchase!: string;
  category!: string;
  timeAndDate!: Date;
  spent!: number;
  modalHeader = "Sign Up"
  addTransaction() {}

  // MODAL

  @Input() modalOpen = false;
  @Output() modalClosed = new EventEmitter<void>();
  closeModal(): void {
    this.modalClosed.emit();
  }
}
