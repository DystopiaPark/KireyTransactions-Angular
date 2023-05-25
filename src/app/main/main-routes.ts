import { Routes } from "@angular/router";
import { HomepageComponent } from "./homepage/homepage.component";
import { AuthGuard } from "../common/guards/auth.guard";
import { TransactionsComponent } from "./transactions/transactions.component";

export const mainRoutes: Routes = [
    { path: '', redirectTo: 'homepage', pathMatch: 'full' },
    { path: 'homepage', component: HomepageComponent, canActivate:[AuthGuard] },
    { path: 'transactions', component: TransactionsComponent, canActivate:[AuthGuard] },
  ];