import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Transactions } from '../../common/models/transactions';
import { Router } from '@angular/router';
import { UsersService } from 'src/app/services/users.service';
import { TransactionsService } from 'src/app/services/transactions.service';

@Component({
  selector: 'app-transactions',
  templateUrl: './transactions.component.html',
  styleUrls: ['./transactions.component.scss']
})
export class TransactionsComponent implements OnInit {
  selectedTransaction: any;
  user:any;
  transactionArray!: Transactions[];
  amount: any;

  constructor (private router: Router, private usersService: UsersService, private transactionsService: TransactionsService){}

  // onAmountChanged get value from child component
  onAmountChanged(amount: number) {
    this.amount = amount;
  }

  ngOnInit(): void {
    this.usersService.getUser().subscribe(
      (response: any) => {
        const responseBody = response.body;
        if (responseBody && responseBody.length > 0) {
          this.user = responseBody[0];
          this.amount = this.user.accountAmount;
          this.transactionsService.getTransactions(this.user.id).subscribe((response: any) =>{
            this.transactionArray = response;
          })
        } else {
          console.error('User data not found.');
        }
      },
      (error: any) => {
        console.error('Failed to fetch user data:', error);
      }
    )
  }
  

  deleteTransaction(transaction: any) {
    this.transactionsService.deleteTransaction(transaction.id).subscribe((response: any)=> {
      console.log("Transaction deleted", response);
      this.updateTransactionArray();
    })
  }

  updateTransactionArray() {
    this.transactionsService.getTransactions(this.user.id).subscribe((response: any) => {
      this.transactionArray = response;
    });
  }

  logout() {
    localStorage.removeItem('userData');
    localStorage.removeItem("auth");
    this.router.navigate(['auth/signin']);
  }

  // emited from child
  sendSelectedTransactionToChild(transaction: any) {
    this.selectedTransaction = transaction;
  }
  onTransactionChanged(transaction: any) {
    this.selectedTransaction = transaction;
  }
 // ADD TRANSACTION MODAL
  modalOpen = false;
  @Output() modalClosed = new EventEmitter<void>();
  openModal(): void {
    this.modalOpen = true;    
  }
  closeModal(): void {
    this.modalOpen = false;
  }

  // EDIT TRANSACTION MODAL
  modalEditOpen = false;
  @Output() modalEditClosed = new EventEmitter<void>();
  openEditModal(): void {
    this.modalEditOpen = true;
  }
  closeEditModal(): void {
    this.modalEditOpen = false;
  }
}