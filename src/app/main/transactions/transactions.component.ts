import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { User } from '../../common/models/user';
import { Transactions } from '../../common/models/transactions';
import { Router } from '@angular/router';
import { UsersService } from 'src/app/services/users.service';

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

  constructor (private router: Router, private usersService: UsersService){}

  // onAmountChanged get value from child component
  onAmountChanged(kva: number) {
    this.amount = kva;
  }
  onAmountChanged2(amount: number) {
    this.amount = amount;
  }

  ngOnInit(): void {
    this.usersService.getUser().subscribe(
      (response: any) => {
        const responseBody = response.body;
        if (responseBody && responseBody.length > 0) {
          this.user = responseBody[0];
          this.transactionArray = this.user.transactions? this.user.transactions : [];
          this.amount = this.user.accountAmount;
        } else {
          console.error('User data not found.');
        }
      },
      (error: any) => {
        console.error('Failed to fetch user data:', error);
      }
    );
  }
  



  sendSelectedTransactionToChild(transaction: any) {
    this.selectedTransaction = transaction;
  }

  deleteTransaction(transaction: any) {
    console.log('Delete', transaction);
    this.usersService.getUser().subscribe(
      (response: any) => {
        const userObject: User = response.body[0];
        userObject.transactions?.forEach((el, index) => {
          if (el.id === transaction.id){
            userObject.transactions?.splice(index,1);
          }
          if(userObject.transactions?.length! < 1) {
            delete userObject.transactions;
          }
        })
        this.usersService.deleteTransaction(this.user, userObject).subscribe(
            response => {
              console.log('Transaction deleted successfully:', response);
            },
            error => {
              console.error('Failed to delete transaction:', error);
            }
          );   
          })
    const index = this.transactionArray.indexOf(transaction);
    if (index !== -1) {
      this.transactionArray.splice(index, 1);
    }
  }

  logout() {
    localStorage.removeItem('userData');
    localStorage.removeItem("auth");
    this.router.navigate(['auth/signin']);
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
