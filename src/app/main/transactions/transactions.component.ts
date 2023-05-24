import { Component, EventEmitter, Output } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../../common/models/user';
import { Transactions } from '../../common/models/transactions';
import { Router } from '@angular/router';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-transactions',
  templateUrl: './transactions.component.html',
  styleUrls: ['./transactions.component.scss']
})
export class TransactionsComponent {

  userData:any = this.getUserData();
  selectedTransaction: any;
  transactionArray: Transactions[] = this.userData.transactions? this.userData.transactions : [];

  constructor (private http: HttpClient, private router: Router, private usersService: UsersService){}

  getUserData() {
    let rawData: any = localStorage.getItem("userData");
    let convertedData: any = JSON.parse(rawData);
    let objectData: any = convertedData[0];
    return objectData;
  }

  sendSelectedTransactionToChild(transaction: any) {
    this.selectedTransaction = transaction;
  }

  deleteTransaction(transaction: any) {
    console.log('Delete', transaction);
    let receivedData = this.usersService.getUser(this.userData);
    receivedData.subscribe(
      (response: any) => {
        const responseBody = response.body;
        const userObject: User = response.body[0];
        userObject.transactions?.forEach((el, index) => {
          if (el.id === transaction.id){
            userObject.transactions?.splice(index,1);
          }
        })
        let deleteTransaction = this.usersService.deleteTransaction(this.userData.id, userObject)
        deleteTransaction.subscribe(
            response => {
              console.log('Transaction deleted successfully:', response);
              // local storage
                localStorage.setItem("userData", JSON.stringify(responseBody)) // crazy stuff :D
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
    localStorage.removeItem("currUser");
    this.router.navigate(['auth/signin']);
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
