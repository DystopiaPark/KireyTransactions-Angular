import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Transactions } from 'src/app/common/models/transactions';
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
  selectedTransactionNewValue!: Transactions;
  previousAmount: any;
  initialTransactionId: any;

  constructor(private formBuilder: FormBuilder, private usersService: UsersService) {}

  getUserData() {
    let rawData: any = localStorage.getItem("userData");
    let convertedData: any = JSON.parse(rawData);
    let objectData: any = convertedData[0];
    return objectData;
  }

  ngOnInit(): void {
    console.log(this.selectedTransaction.amountSpent);
    
    this.initialTransactionId = this.selectedTransaction.id;
    this.previousAmount = this.selectedTransaction.amountSpent;
    this.purchaseForm = this.formBuilder.group({
      purchase: new FormControl(this.selectedTransaction.purchase, Validators.required),
      category: new FormControl(this.selectedTransaction.category, Validators.required),
      timeAndDate: new FormControl(this.selectedTransaction.timeAndDate, Validators.required),
      amountSpent: new FormControl(this.selectedTransaction.amountSpent, [
        Validators.required,
        Validators.max(this.previousAmount + this.data.accountAmount)
      ])
    });
  }
  
  @Output() transactionChanged = new EventEmitter<number>();

  editTransaction() {

    
  // console.log(this.selectedTransaction.amountSpent, this.previousAmount);
  
  this.usersService.getUser(this.data).subscribe(
    (response: any) => {
      const responseBody = response.body;
      const userObject: User = response.body[0];
      this.selectedTransactionNewValue = this.purchaseForm.value; 
      this.selectedTransactionNewValue.id = this.selectedTransaction.id; 

      userObject.accountAmount = userObject.accountAmount - (this.selectedTransactionNewValue.amountSpent - this.previousAmount);
      // update in server
      userObject.transactions?.forEach((el, index) => {
        if (el.id === this.selectedTransaction.id){
          userObject.transactions?.splice(index, 1, this.selectedTransactionNewValue);
        }
      })
      // update in local array
      this.transactionArray.forEach((el:any, index:number) => {
        if (el.id === this.selectedTransaction.id){
          this.transactionArray.splice(index, 1, this.selectedTransactionNewValue);
        }
      })
      this.usersService.editUser(this.data, userObject).subscribe(
          response => {
            console.log('Transaction edited successfully:', response);
            // local storage
            this.transactionChanged.emit(undefined);
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
    this.transactionChanged.emit(undefined);
    console.log(this.selectedTransaction);
  }
}
