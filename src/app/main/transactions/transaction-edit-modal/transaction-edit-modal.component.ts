import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Transactions } from 'src/app/common/models/transactions';
import { User } from 'src/app/common/models/user';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-transaction-edit-modal',
  templateUrl: './transaction-edit-modal.component.html',
  styleUrls: ['./transaction-edit-modal.component.scss']
})
export class TransactionEditModalComponent implements OnInit {
  @Input() transactionArray: any;
  @Input() selectedTransaction: any;

  purchaseForm!: FormGroup;
  user: any;
  modalHeader = "Edit transaction"
  selectedTransactionNewValue!: Transactions;
  accountAmount: any;
  previousAmount: any;

  constructor(private formBuilder: FormBuilder, private usersService: UsersService) {}

  ngOnInit(): void {
    this.purchaseForm = this.formBuilder.group({
      purchase: new FormControl('', Validators.required),
      category: new FormControl('', Validators.required),
      timeAndDate: new FormControl('', Validators.required),
      amountSpent: new FormControl('', Validators.required)
    });

    this.usersService.getUser().subscribe(
      (response: any) => {
        const responseBody = response.body;
        if (responseBody && responseBody.length > 0) {
          this.user = responseBody[0];
          this.accountAmount = this.user.accountAmount;
          this.previousAmount = this.selectedTransaction.amountSpent;

          this.purchaseForm.patchValue({
            purchase: this.selectedTransaction.purchase,
            category: this.selectedTransaction.category,
            timeAndDate: this.selectedTransaction.timeAndDate,
            amountSpent: this.selectedTransaction.amountSpent
          });

          this.purchaseForm.get('amountSpent')?.setValidators([
            Validators.required,
            Validators.max(this.previousAmount + this.accountAmount)
          ]);

          this.purchaseForm.get('amountSpent')?.updateValueAndValidity();
          this.purchaseForm.enable();
        } else {
          console.error('User data not found.');
        }
      },
      (error: any) => {
        console.error('Failed to fetch user data:', error);
      }
    );
  }
  
  @Output() transactionChanged = new EventEmitter<number>();

  editTransaction() {
  console.log(this.previousAmount, this.accountAmount, this.user);
  this.usersService.getUser().subscribe(
    (response: any) => {
      const responseBody = response.body;
      const userObject: User = response.body[0];
      this.selectedTransactionNewValue = this.purchaseForm.value; 
      this.selectedTransactionNewValue.id = this.selectedTransaction.id; 
      userObject.accountAmount = userObject.accountAmount - (this.selectedTransactionNewValue.amountSpent - this.previousAmount);
      this.accountAmount = userObject.accountAmount;
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
      this.usersService.editUser(this.user, userObject).subscribe(
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
