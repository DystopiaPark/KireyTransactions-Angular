import { Component, EventEmitter, Input, Output } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { Transactions } from 'src/app/common/models/transactions';
import { TransactionsService } from 'src/app/services/transactions.service';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-transaction-modal',
  templateUrl: './transaction-modal.component.html',
  styleUrls: ['./transaction-modal.component.scss']
})
export class TransactionModalComponent {
  @Input() transactionArray!: Transactions[];
  purchaseForm!: FormGroup;
  user: any;
  amount!:number;
  modalHeader = "Add transaction"
  transactionObject!: Transactions;

  constructor(private formBuilder: FormBuilder, private usersService: UsersService, private transactionsService: TransactionsService) {}

  ngOnInit(): void {
    this.getUserData();
  }
  
  initializeForm(): void {
    this.purchaseForm = this.formBuilder.group({
      purchase: ['', Validators.required],
      category: ['', [Validators.required]],
      timeAndDate: ['', [Validators.required]],
      amountSpent: ['', [Validators.required, Validators.min(1), this.amountValidator(this.amount)]]
    });
  }
  
  getUserData(){
    this.usersService.getUser().subscribe(
      (response: any) => {
        const responseBody = response.body;
        if (responseBody && responseBody.length > 0) {
          this.user = responseBody[0];
          this.amount = this.user.accountAmount;
          this.initializeForm();
        } else {
          console.error('User data not found.');
        }
      },
      (error: any) => {
        console.error('Failed to fetch user data:', error);
      }
    );
  }

  // Custom validator function
amountValidator(amount: number): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    const enteredAmount = parseFloat(control.value);
    return enteredAmount > amount ? { 'exceededAmount': true } : null;
  };
}

// Update the amount validator when this.amount changes
updateAmountValidator(): void {
  this.purchaseForm.get('amountSpent')?.setValidators([Validators.required, this.amountValidator(this.amount)]);
  this.purchaseForm.get('amountSpent')?.updateValueAndValidity();
}
@Output() amountChanged = new EventEmitter<number>();
@Output() transactionAdded = new EventEmitter<void>();

addTransaction() {
     let transaction = this.purchaseForm.value;
     transaction.userId = this.user.id;
     transaction.id = this.usersService.randomID();
     this.transactionsService.createTransaction(transaction).subscribe((response:any) => {
      console.log("Transaction added", response);
      this.updateTransactionArray();
      this.updateAmount(transaction.amountSpent);
      this.transactionAdded.emit();
     })
     this.closeModal();
}

updateAmount(transactionPrice: number): void {
    const updatedObject = { ...this.user, accountAmount: this.amount - transactionPrice };
    this.usersService.editUser(this.user, updatedObject).subscribe(
      response => {
        console.log('Amount updated successfully:', updatedObject.accountAmount);
        this.amountChanged.emit(updatedObject.accountAmount);
      },
      error => {
        console.error('Failed to update amount:', error);
      }
    );
  }

updateTransactionArray() {
  this.transactionsService.getTransactions(this.user.id).subscribe((response: any) => {
    console.log(response);
    this.transactionArray = response;
  });
}
  // MODAL

  @Input() modalOpen = false;
  @Output() modalClosed = new EventEmitter<void>();
  closeModal(): void {
    this.modalClosed.emit();
  }
}
