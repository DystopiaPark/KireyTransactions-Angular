import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Transactions } from 'src/app/common/models/transactions';
import { TransactionsService } from 'src/app/services/transactions.service';
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
  amount: any;

  constructor(private formBuilder: FormBuilder, private usersService: UsersService, private transactionsService: TransactionsService) {}

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

  @Output() amountChanged = new EventEmitter<number>();
  @Output() transactionFinished = new EventEmitter<number>();
  @Output() transactionChanged = new EventEmitter<void>();

  editTransaction() {
    let editedTransaction = this.purchaseForm.value;
    editedTransaction.userId = this.user.id;
     this.transactionsService.editTransaction(this.selectedTransaction.id, editedTransaction).subscribe(
      (response: any) => {
        console.log("Transaction edited!", response);
        this.updateTransactionArray();
        this.updateAmount(editedTransaction.amountSpent);
        this.transactionChanged.emit();
      })
  this.closeEditModal();
  }
  updateAmount(newTransactionPrice: number): void {
    this.selectedTransactionNewValue = this.purchaseForm.value; 
    const updatedObject = { ...this.user, accountAmount: this.user.accountAmount - (newTransactionPrice - this.previousAmount) };
    this.amountChanged.emit(updatedObject.accountAmount);
    this.usersService.editUser(this.user, updatedObject).subscribe(
      response => {
        console.log('Amount updated successfully:', updatedObject.accountAmount);
        this.transactionChanged.emit(undefined);
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


  // EDIT MODAL
  @Input() modalEditOpen = false;
  @Output() modalEditClosed = new EventEmitter<void>();
  closeEditModal(): void {
    this.modalEditClosed.emit();
    this.transactionFinished.emit(undefined);
    console.log(this.selectedTransaction);
  }
}
