import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
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
  @Input() balance!: number;
  @Input() modalEditOpen = false;

  @Output() modalEditClosed = new EventEmitter<void>();
  @Output() balanceChanged = new EventEmitter<number>();
  @Output() transactionChanged = new EventEmitter<void>();

  purchaseForm!: FormGroup;
  user: any;
  modalHeader: string = "Edit transaction"
  accountAmount: any;
  previousAmount: any;
  categories: string[] = ["Other", "Clothing", "Tech", "Equipment"]; 

  constructor(private formBuilder: FormBuilder, private usersService: UsersService, private transactionsService: TransactionsService) {}

  ngOnInit(): void {
    this.purchaseForm = this.formBuilder.group({
      purchase: new FormControl('', Validators.required),
      category: new FormControl('', Validators.required),
      timeAndDate: new FormControl('', Validators.required),
      amountSpent: new FormControl('', Validators.required)
    });
    this.fetchUserDataAndValidate();
  }

  fetchUserDataAndValidate() {
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

  editTransaction() {
    let editedTransaction = this.purchaseForm.value;
    editedTransaction.userId = this.user.id;
    this.transactionsService.editTransaction(this.selectedTransaction.id, editedTransaction).subscribe(
    (response: any) => {
      console.log("Transaction edited!", response);
      this.updateTransactionArray();
      this.updateAmount(editedTransaction.amountSpent);
    })
    this.closeEditModal();
  }

  updateTransactionArray() {
    this.transactionsService.getTransactions(this.user.id).subscribe((response: any) => {
      console.log(response);
      this.transactionArray = response;
    });
  }
  
  updateAmount(newTransactionPrice: number): void {
    const updatedObject = { ...this.user, accountAmount: this.user.accountAmount - (newTransactionPrice - this.previousAmount) };
    this.balance = updatedObject.accountAmount;
    this.balanceChanged.emit(this.balance);
    this.usersService.editUser(this.user, updatedObject).subscribe(
      response => {
        console.log('Balance updated successfully:', updatedObject.accountAmount);
        this.transactionChanged.emit(undefined);
      },
        error => {
          console.error('Failed to update balance:', error);
      }
    );
  }

  closeEditModal(): void {
    this.modalEditClosed.emit();
  setTimeout(()=> {
    this.transactionChanged.emit(undefined);
  }, 100);
  }
}