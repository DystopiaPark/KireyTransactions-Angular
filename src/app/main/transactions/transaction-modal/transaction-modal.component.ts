import { Component, EventEmitter, Input, Output } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { Transactions } from 'src/app/common/models/transactions';
import { HttpClient } from '@angular/common/http';
import { User } from 'src/app/common/models/user';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-transaction-modal',
  templateUrl: './transaction-modal.component.html',
  styleUrls: ['./transaction-modal.component.scss']
})
export class TransactionModalComponent {
  @Input() transactionArray: any;

  purchaseForm!: FormGroup;
  data:any = this.getUserData();
  amount:number = this.data.accountAmount;
  modalHeader = "Sign Up"
  transactionObject!: Transactions;

  constructor(private formBuilder: FormBuilder, private http: HttpClient, private usersService: UsersService) {}

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

  randomID(){
    return Math.floor(Math.random() * 1000000)
  }

  addTransaction() {
  this.usersService.getUser(this.data).subscribe(
    (response: any) => {
      const responseBody = response.body;
      const userObject: User = response.body[0];
      this.transactionObject = this.purchaseForm.value;  
      this.transactionObject.id = this.randomID();
      userObject.accountAmount -= this.transactionObject.amountSpent;
      this.amount = userObject.accountAmount;
      this.updateAmountValidator();
      if (userObject.transactions) {
      userObject.transactions.push(this.transactionObject);
      this.transactionArray.push(this.transactionObject);
      this.usersService.editUser(this.data, userObject).subscribe(
          response => {
            console.log('Transaction added successfully:', response);
              // parent component
              this.purchaseForm.reset();
              
            // local storage
              localStorage.setItem("userData", JSON.stringify(responseBody))
          },
          error => {
            console.error('Failed to add transaction:', error);
          }
        );   
    } else {
      userObject.transactions = [];
      userObject.transactions.push(this.transactionObject);
      this.transactionArray.push(this.transactionObject);
      this.usersService.editUser(this.data, userObject).subscribe(
          response => {
            console.log('Transaction added successfully:', response);
            this.purchaseForm.reset();
            // local storage
              localStorage.setItem("userData", JSON.stringify(responseBody))
          },
          error => {
            console.error('Failed to add transaction:', error);
          }
        );   
    } 
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
