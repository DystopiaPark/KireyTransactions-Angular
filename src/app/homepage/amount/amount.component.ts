import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-amount',
  templateUrl: './amount.component.html',
  styleUrls: ['./amount.component.scss']
})
export class AmountComponent {
  @Input() modal!: boolean;

  amount!: number;
  modalHeader = "Set new amount"

  saveAmount () {}

    // MODAL

    @Input() modalOpen = false;
    @Output() modalClosed = new EventEmitter<void>();
    closeModal(): void {
      this.modalClosed.emit();
    }
}
