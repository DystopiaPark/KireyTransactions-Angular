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
  @Output() modalClosed = new EventEmitter<void>();
  @Output() modalEditClosed = new EventEmitter<void>();

  modalEditOpen: boolean = false;
  modalOpen: boolean = false;
  selectedTransaction: any;
  user: any;
  transactionArray!: Transactions[];
  balance: any;

  constructor (private usersService: UsersService, private transactionsService: TransactionsService){}

  ngOnInit(): void {
    this.fetchUserData();
  }

  fetchUserData(){
    this.usersService.getUser().subscribe(
      (response: any) => {
        const responseBody = response.body;
        if (responseBody && responseBody.length > 0) {
          this.user = responseBody[0];
          this.balance = this.user.accountAmount;
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

  // store selected transaction on click, it will be input into child
  storeSelectedTransaction(transaction: any) {
    this.selectedTransaction = transaction;
  }
  // when editing transaction closes, make selected transaction undefined [this is from child]
  onEditTransactionClosed(transaction: any) {
    this.selectedTransaction = transaction;
  }
  // when amount changes get value from child component and send it to parent [this is from child]
  onAmountChanged(balance: number) {
    this.balance = balance;
  }

  openModal(): void {
    this.modalOpen = true;    
  }
  closeModal(): void {
    this.modalOpen = false;
  }

  openEditModal(): void {
    this.modalEditOpen = true;
  }
  closeEditModal(): void {
    this.modalEditOpen = false;
  }
}