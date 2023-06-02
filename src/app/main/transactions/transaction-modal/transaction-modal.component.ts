import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { Transactions } from 'src/app/common/models/transactions';
import { TransactionsService } from 'src/app/services/transactions.service';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-transaction-modal',
  templateUrl: './transaction-modal.component.html',
  styleUrls: ['./transaction-modal.component.scss']
})
export class TransactionModalComponent implements OnInit, OnChanges {
  @Input() transactionArray!: Transactions[];
  @Input() balance!: number;
  @Input() modalOpen = false;

  @Output() balanceChanged = new EventEmitter<number>();
  @Output() transactionAdded = new EventEmitter<void>();
  @Output() modalClosed = new EventEmitter<void>();

  purchaseForm!: FormGroup;
  user: any;
  modalHeader: string = "Add transaction"
  transactionObject!: Transactions;
  categories: string[] = ["Other", "Clothing", "Tech", "Equipment"]; 

  constructor(private formBuilder: FormBuilder, private usersService: UsersService, private transactionsService: TransactionsService) {}

  ngOnInit(): void {
    this.fetchUserData();
    this.initializeForm();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['amount'] && !changes['amount'].firstChange) {
      this.updateAmountValidator();
    }
  }

  fetchUserData(){
    this.usersService.getUser().subscribe(
      (response: any) => {
        const responseBody = response.body;
        if (responseBody && responseBody.length > 0) {
          this.user = responseBody[0];
          this.balance = this.user.accountAmount;
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

  initializeForm(): void {
    this.purchaseForm = this.formBuilder.group({
      purchase: ['', Validators.required],
      category: ['', Validators.required],
      timeAndDate: ['', [Validators.required]],
      amountSpent: ['', [Validators.required, this.amountValidator(this.balance)]]
    });
  }
  
  updateAmountValidator(): void {
    if (this.purchaseForm) {
      const amountSpentControl = this.purchaseForm.get('amountSpent');
      if (amountSpentControl) {
        amountSpentControl.setValidators([Validators.required, this.amountValidator(this.balance)]);
        amountSpentControl.updateValueAndValidity();
      }
    }
  }

  amountValidator(amount: number): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      const enteredAmount = parseFloat(control.value);
      return enteredAmount > amount ? { 'exceededAmount': true } : null;
    };
  }

  addTransaction() {
    console.log(this.purchaseForm.value);
    let transaction = this.purchaseForm.value;
    transaction.userId = this.user.id;
    transaction.id = this.usersService.generateRandomID();
    this.transactionsService.createTransaction(transaction).subscribe((response:any) => {
    console.log("Transaction added", response);
    this.updateTransactionArray();
    this.updateAmount(transaction.amountSpent);
    this.transactionAdded.emit();
    })
    this.closeModal();
  }

  updateTransactionArray() {
    this.transactionsService.getTransactions(this.user.id).subscribe((response: any) => {
      console.log(response);
      this.transactionArray = response;
    });
  }

  updateAmount(transactionPrice: number): void {
    let updatedObject = { ...this.user, accountAmount: this.balance - transactionPrice };
    this.usersService.editUser(this.user, updatedObject).subscribe(
      response => {
        console.log('Balance updated successfully:', updatedObject.accountAmount);
        this.balance = updatedObject.accountAmount;
        this.updateAmountValidator();
        this.balanceChanged.emit(updatedObject.accountAmount);
      },
      error => {
        console.error('Failed to update balance:', error);
      }
    );
  }

  closeModal(): void {
    this.modalClosed.emit();
    this.purchaseForm.reset();
  }
}