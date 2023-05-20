import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Transactions } from 'src/app/common/models/transactions';

@Component({
  selector: 'app-transaction-modal',
  templateUrl: './transaction-modal.component.html',
  styleUrls: ['./transaction-modal.component.scss']
})
export class TransactionModalComponent {
  purchaseForm!: FormGroup;
  data:any = this.getUserData();
  amount:number = this.data.accountAmount;
  modalHeader = "Sign Up"

  constructor(private formBuilder: FormBuilder) {}

  getUserData() {
    let rawData: any = localStorage.getItem("userData");
    let convertedData: any = JSON.parse(rawData);
    let objectData: any = convertedData[0];
    return objectData;
  }

  ngOnInit(): void {
    this.purchaseForm = this.formBuilder.group({
      purchase: ['', Validators.required],
      category: ['', [Validators.required]],
      timeAndDate: ['', [Validators.required]],
      amountSpent: ['', [Validators.required, Validators.max(this.amount)]]
    });
  }  


  addTransaction() {
    
  }

  // MODAL

  @Input() modalOpen = false;
  @Output() modalClosed = new EventEmitter<void>();
  closeModal(): void {
    this.modalClosed.emit();
  }
}
