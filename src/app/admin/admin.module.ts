import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminRoutingModule } from './admin-routing.module';
import { CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { InputNumberModule } from 'primeng/inputnumber';
import { HttpClientModule } from '@angular/common/http';
import { TableModule } from 'primeng/table';
import { DropdownModule } from 'primeng/dropdown';

import { AdminHomepageComponent } from './admin-homepage/admin-homepage.component';
import { AdminInfoComponent } from './admin-info/admin-info.component';
import { AdminHomepageNavComponent } from './admin-homepage/admin-homepage-nav/admin-homepage-nav.component';
import { AdminHomepageMainComponent } from './admin-homepage/admin-homepage-main/admin-homepage-main.component';

@NgModule({
declarations: [AdminHomepageComponent, AdminInfoComponent, AdminHomepageNavComponent, AdminHomepageMainComponent],
imports: [
    AdminRoutingModule,
    CommonModule,  
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
    DropdownModule
]
})
export class AdminModule { }
