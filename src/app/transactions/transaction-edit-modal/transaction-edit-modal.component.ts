import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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
  @Input() selectedTransaction: any;

  purchaseForm!: FormGroup;
  data:any = this.getUserData();
  amount:number = this.data.accountAmount;
  modalHeader = "Edit transaction"
  transactionObject!: Transactions;

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
      amountSpent: ['', [Validators.required, Validators.max(this.amount)]]
    });
  }  

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
      userObject.transactions?.forEach((el, index) => {
        if (el.id === this.selectedTransaction.id){
          userObject.transactions?.splice(index,1, this.selectedTransaction);
        }
      })
      this.http.put(urlPut, userObject).subscribe(
          response => {
            console.log('Amount updated successfully:', response);
              // parent component
              // this.amountChanged.emit(this.amount);
            // local storage
              localStorage.setItem("userData", JSON.stringify(responseBody))
          },
          error => {
            console.error('Failed to update amount:', error);
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
