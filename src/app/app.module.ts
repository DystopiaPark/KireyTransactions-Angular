import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http'
import { CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from "primeng/password";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { InputNumberModule } from 'primeng/inputnumber';
import { TableModule } from 'primeng/table';
import { HomepageModule } from './homepage/homepage.module';


import { AppComponent } from './app.component';
import { SignInComponent } from './sign-in/sign-in.component';
import { SignUpComponent } from './sign-in/sign-up/sign-up.component';
import { TransactionsComponent } from './transactions/transactions.component';
import { TransactionModalComponent } from './transactions/transaction-modal/transaction-modal.component';
import { TransactionEditModalComponent } from './transactions/transaction-edit-modal/transaction-edit-modal.component';
import { AuthGuard } from './common/guards/auth.guard';

@NgModule({
  declarations: [
    AppComponent,
    SignInComponent,
    SignUpComponent,
    TransactionsComponent,
    TransactionModalComponent,
    TransactionEditModalComponent, 
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CardModule, 
    InputTextModule,
    PasswordModule,
    FormsModule,
    ButtonModule,
    DialogModule,
    BrowserAnimationsModule,
    InputNumberModule,
    HttpClientModule,
    ReactiveFormsModule,
    TableModule,
    HomepageModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
