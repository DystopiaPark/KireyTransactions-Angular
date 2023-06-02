import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TransactionsService {

  constructor(private http: HttpClient) {}

  createTransaction (transaction: any) {
    return this.http.post('http://localhost:3000/transactions', transaction);
  }
  
  getTransactions(id:number) {
    return this.http.get(`http://localhost:3000/transactions?userId=` + id)
  }
  
  editTransaction(id:number, editedTransaction: any){
    return this.http.put(`http://localhost:3000/transactions/${id}`, editedTransaction)
  }

  deleteTransaction (id:number) {
    return this.http.delete(`http://localhost:3000/transactions/${id}`)
  }
}

