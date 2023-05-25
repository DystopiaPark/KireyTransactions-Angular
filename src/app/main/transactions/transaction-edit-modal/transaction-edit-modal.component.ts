import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Transactions } from 'src/app/common/models/transactions';
import { HttpClient } from '@angular/common/http';
import { User } from 'src/app/common/models/user';
import { UsersService } from 'src/app/services/users.service';

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
  modalHeader = "Edit transaction"
  transactionObject!: Transactions;
  previousAmount: any;

  constructor(private formBuilder: FormBuilder, private http: HttpClient, private usersService: UsersService) {}

  getUserData() {
    let rawData: any = localStorage.getItem("userData");
    let convertedData: any = JSON.parse(rawData);
    let objectData: any = convertedData[0];
    return objectData;
  }

  ngOnInit(): void {
    this.previousAmount = this.selectedTransaction.amountSpent;
    console.log(this.data.accountAmount, this.previousAmount);
    // this.currAmount = this.data.
    this.purchaseForm = this.formBuilder.group({
      purchase: ['', Validators.required],
      category: ['', [Validators.required]],
      timeAndDate: ['', [Validators.required]],
      amountSpent: ['', [Validators.required, Validators.max(this.previousAmount + this.data.accountAmount)]]
    });
  }  


  editTransaction() {
  this.usersService.getUser(this.data).subscribe(
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


      
      








      userObject.transactions?.forEach((el, index) => {
        if (el.id === this.selectedTransaction.id){
          userObject.transactions?.splice(index, 1, this.selectedTransaction);
        }
      })
      this.usersService.editUser(this.data, userObject).subscribe(
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
  this.selectedTransaction = undefined;
  this.closeEditModal();
  }


  // EDIT MODAL
  @Input() modalEditOpen = false;
  @Output() modalEditClosed = new EventEmitter<void>();
  closeEditModal(): void {
    this.modalEditClosed.emit();
    this.selectedTransaction = undefined;
  }
}
