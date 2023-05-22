import { Component, EventEmitter, Output } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../common/models/user';

@Component({
  selector: 'app-transactions',
  templateUrl: './transactions.component.html',
  styleUrls: ['./transactions.component.scss']
})
export class TransactionsComponent {
  data:any = this.getUserData();
  transactionArray = this.data.transactions;
  selectedTransaction: any;
  constructor (private http: HttpClient){}


  getUserData() {
    let rawData: any = localStorage.getItem("userData");
    let convertedData: any = JSON.parse(rawData);
    let objectData: any = convertedData[0];
    return objectData;
  }

  sendTransactionData(transaction: any) {
    this.selectedTransaction = transaction;

    
  }

  deleteTransaction(transaction: any) {
    console.log('Delete', transaction);
    const url = `http://localhost:3000/users?email=${this.data.email}&password=${this.data.password}`;
    const urlPut = `http://localhost:3000/users/${this.data.id}`;
    this.http.get(url, {observe:'response'}).subscribe(
      (response: any) => {
        const responseBody = response.body;
        const userObject: User = response.body[0];
        userObject.transactions?.forEach((el, index) => {
          if (el.id === transaction.id){
            userObject.transactions?.splice(index,1);
          }
        })
        this.http.put(urlPut, userObject).subscribe(
            response => {
              console.log('Amount updated successfully:', response);
              // local storage
                localStorage.setItem("userData", JSON.stringify(responseBody))
            },
            error => {
              console.error('Failed to update amount:', error);
            }
          );   
          })
    const index = this.transactionArray.indexOf(transaction);
    if (index !== -1) {
      this.transactionArray.splice(index, 1);
    }
  }

  // MODAL
  modalOpen = false;
  @Output() modalClosed = new EventEmitter<void>();
  openModal(): void {
    this.modalOpen = true;
  }
  closeModal(): void {
    this.modalOpen = false;
  }
    // EDIT MODAL
    modalEditOpen = false;
    @Output() modalEditClosed = new EventEmitter<void>();
    openEditModal(): void {
      this.modalEditOpen = true;
    }
    closeEditModal(): void {
      this.modalEditOpen = false;
    }
}
