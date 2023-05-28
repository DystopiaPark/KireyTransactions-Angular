import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainRoutingModule } from './main-routing.module';
import { HomepageComponent } from './homepage/homepage.component';
import { TransactionsComponent } from './transactions/transactions.component';
import { CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { InputNumberModule } from 'primeng/inputnumber';
import { HttpClientModule } from '@angular/common/http';
import { TableModule } from 'primeng/table';
import { AmountComponent } from './homepage/amount/amount.component';
import { TransactionModalComponent } from './transactions/transaction-modal/transaction-modal.component';
import { TransactionEditModalComponent } from './transactions/transaction-edit-modal/transaction-edit-modal.component';
import { TransactionsNavComponent } from './transactions/transactions-nav/transactions-nav.component';


@NgModule({
  declarations: [HomepageComponent, TransactionsComponent, AmountComponent, TransactionModalComponent, TransactionEditModalComponent, TransactionsNavComponent],
  imports: [
    CommonModule,
    
    MainRoutingModule,
    CardModule, 
    InputTextModule,
    PasswordModule,
    FormsModule,
    ButtonModule,
    DialogModule,
    InputNumberModule,
    HttpClientModule,
    ReactiveFormsModule,
    TableModule,
  ]
})
export class MainModule { }
