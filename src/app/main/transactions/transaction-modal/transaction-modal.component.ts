import { Component, EventEmitter, Input, Output } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { Transactions } from 'src/app/common/models/transactions';
import { User } from 'src/app/common/models/user';
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

  constructor(private formBuilder: FormBuilder, private usersService: UsersService) {}

  ngOnInit(): void {
    this.usersService.getUser().subscribe(
      (response: any) => {
        const responseBody = response.body;
        if (responseBody && responseBody.length > 0) {
          this.user = responseBody[0];
          this.amount = this.user.accountAmount;
        } else {
          console.error('User data not found.');
        }
      },
      (error: any) => {
        console.error('Failed to fetch user data:', error);
      }
    );
    this.purchaseForm = this.formBuilder.group({
      purchase: ['', Validators.required],
      category: ['', [Validators.required]],
      timeAndDate: ['', [Validators.required]],
      amountSpent: ['', [Validators.required, this.amountValidator(this.amount)]]
    });
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

addTransaction() {
  this.usersService.getUser().subscribe(
    (response: any) => {
      const userObject: User = response.body[0];
      this.transactionObject = this.purchaseForm.value;
      this.transactionObject.id = this.usersService.randomID();
      userObject.accountAmount -= this.transactionObject.amountSpent;
      this.amount = userObject.accountAmount;
      this.updateAmountValidator();
      if (!userObject.transactions) {
        userObject.transactions = [];
      }
      userObject.transactions.push(this.transactionObject);
      this.usersService.editUser(this.user, userObject).subscribe(
        response => {
          console.log('Transaction added successfully:', response);
          this.transactionArray.push(this.transactionObject);
          this.purchaseForm.reset();
        },
        error => {
          console.error('Failed to add transaction:', error);
        }
      );
    },
    error => {
      console.error('Failed to retrieve object:', error);
    }
  );
  this.closeModal();
}

  // MODAL

  @Input() modalOpen = false;
  @Output() modalClosed = new EventEmitter<void>();
  closeModal(): void {
    this.modalClosed.emit();
  }
}
