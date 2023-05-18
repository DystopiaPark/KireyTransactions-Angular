import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-transactions',
  templateUrl: './transactions.component.html',
  styleUrls: ['./transactions.component.scss']
})
export class TransactionsComponent {


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
