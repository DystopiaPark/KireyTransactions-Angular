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
  @Input() selectedTransaction!: any;

  purchaseForm!: FormGroup;
  data:any = this.getUserData();
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
      amountSpent: ['', [Validators.required,]]
    });

  }  


  editTransaction() {
  const url = `http://localhost:3000/users?email=${this.data.email}&password=${this.data.password}`;
  const urlPut = `http://localhost:3000/users/${this.data.id}`;
  this.http.get(url, {observe:'response'}).subscribe(
    (response: any) => {
      const responseBody = response.body;
      const userObject: User = response.body[0];
      this.transactionObject = this.purchaseForm.value;  
      let prevAmount!: number;

      userObject.transactions?.forEach((el) => {
        if (el.id === this.selectedTransaction.id){
          prevAmount = el.amountSpent;
        }
      })

      
      userObject.accountAmount = userObject.accountAmount - (this.transactionObject.amountSpent - prevAmount);


      console.log(`Current amount in bank: ${userObject.accountAmount} Amount after update: ${this.transactionObject.amountSpent} Amount before update: ${prevAmount}` );
      





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
