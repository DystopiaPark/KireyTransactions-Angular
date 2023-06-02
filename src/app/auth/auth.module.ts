import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthRoutingModule } from './auth-routing.module';
import { SignInComponent } from './sign-in/sign-in.component';
import { SignUpComponent } from './sign-in/sign-up/sign-up.component';
import { CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { InputNumberModule } from 'primeng/inputnumber';
import { HttpClientModule } from '@angular/common/http';
import { TableModule } from 'primeng/table';
import { SignUprouteComponent } from './sign-uproute/sign-uproute.component';
import { AdminSignInComponent } from './admin-sign-in/admin-sign-in.component';

@NgModule({
  declarations: [SignInComponent, SignUpComponent, SignUprouteComponent, AdminSignInComponent],
  imports: [
    CommonModule,
    AuthRoutingModule,
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
export class AuthModule { }