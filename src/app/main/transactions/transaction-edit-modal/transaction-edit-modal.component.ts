import { Component, EventEmitter, Input, Output } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { Transactions } from 'src/app/common/models/transactions';
import { HttpClient } from '@angular/common/http';
import { User } from 'src/app/common/models/user';

@Component({
  selector: 'app-transaction-edit-modal',
  templateUrl: './transaction-edit-modal.component.html',
  styleUrls: ['./transaction-edit-modal.component.scss']
})
export class TransactionEditModalComponent {
  @Input() transactionArray: any;
  @Input() selectedTransaction!: any;

  purchaseForm!: FormGroup;
  data:any = this.getUserData();
  validatorAmount:number = this.data.accountAmount;
  modalHeader = "Edit transaction"
  transactionObject!: Transactions;

  previousAmount!: number;

  constructor(private formBuilder: FormBuilder, private http: HttpClient) {}

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
      amountSpent: ['', [Validators.required,]] //this.amountValidator(this.validatorAmount)]]
    });

    this.previousAmount = this.purchaseForm.get('amountSpent')?.value;
  }  


  // // Custom validator function
  // amountValidator(amount: number): ValidatorFn {
  //   return (control: AbstractControl): { [key: string]: any } | null => {
  //     const enteredAmount = parseFloat(control.value);
  //     return enteredAmount > amount ? { 'exceededAmount': true } : null;
  //   };
  // }
  
  // // Update the amount validator when this.amount changes
  // updateAmountValidator(): void {
  //   this.purchaseForm.get('amountSpent')?.setValidators([Validators.required, this.amountValidator(this.validatorAmount)]);
  //   this.purchaseForm.get('amountSpent')?.updateValueAndValidity();
  // }



  randomID(){
    return Math.floor(Math.random() * 1000000)
  }

  editTransaction() {
  const url = `http://localhost:3000/users?email=${this.data.email}&password=${this.data.password}`;
  const urlPut = `http://localhost:3000/users/${this.data.id}`;
  this.http.get(url, {observe:'response'}).subscribe(
    (response: any) => {
      const responseBody = response.body;
      const userObject: User = response.body[0];
      this.transactionObject = this.purchaseForm.value;  
  


      console.log(`Current amount in bank: ${userObject.accountAmount} Amount after update: ${this.transactionObject.amountSpent} Amount before update: ${this.previousAmount}` );
      












      // this.updateAmountValidator();
      userObject.transactions?.forEach((el, index) => {
        if (el.id === this.selectedTransaction.id){
          userObject.transactions?.splice(index, 1, this.selectedTransaction);
        }
      })
      this.http.put(urlPut, userObject).subscribe(
          response => {
            console.log('Transaction edited successfully:', response);
            // local storage
              localStorage.setItem("userData", JSON.stringify(responseBody))
          },
          error => {
            console.error('Failed to edit transaction:', error);
          }
        );   
    },
  );
  this.closeEditModal();
  }


  // EDIT MODAL

  @Input() modalEditOpen = false;
  @Output() modalEditClosed = new EventEmitter<void>();
  closeEditModal(): void {
    this.modalEditClosed.emit();
  }
}
