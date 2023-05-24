import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomepageComponent } from './homepage.component';
import { RouterModule, Routes } from '@angular/router';
import { AmountComponent } from './amount/amount.component';
import { CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { InputNumberModule } from 'primeng/inputnumber';
import { HttpClientModule } from '@angular/common/http';
import { TableModule } from 'primeng/table';

const routes: Routes = [
  { path: '', component: HomepageComponent },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
];

@NgModule({
  declarations: [HomepageComponent, AmountComponent],
  imports: [
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
    CommonModule,
    RouterModule.forChild(routes)],
  exports: [
    RouterModule
  ]
})
export class HomepageModule { }