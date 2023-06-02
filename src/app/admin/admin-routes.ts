import { Routes } from "@angular/router";
import { AdminHomepageComponent } from './admin-homepage/admin-homepage.component';
import { AdminInfoComponent } from './admin-info/admin-info.component';
import { AuthGuard } from "../common/guards/auth.guard";


export const adminRoutes: Routes = [
    { path: '', redirectTo: 'homepage', pathMatch: 'full' },
    { path: 'homepage', component: AdminHomepageComponent, canActivate:[AuthGuard] },
    { path: 'info', component: AdminInfoComponent, canActivate:[AuthGuard] },
];