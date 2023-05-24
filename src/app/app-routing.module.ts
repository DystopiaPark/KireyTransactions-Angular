import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SignInComponent } from './sign-in/sign-in.component';
import { TransactionsComponent } from './transactions/transactions.component';
import { AuthGuard } from './common/guards/auth.guard';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: SignInComponent },
  { path: 'transactions', component: TransactionsComponent },
  { 
    path: 'home',
    loadChildren: () => import('./homepage/homepage.module').then(m => m.HomepageModule), canActivate: [AuthGuard]
    
  },
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
