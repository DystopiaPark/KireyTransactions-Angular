import { Routes } from "@angular/router";
import { AdminHomepageComponent } from './admin-homepage/admin-homepage.component';
import { AdminInfoComponent } from './admin-info/admin-info.component';
import { AdminGuard } from "../common/guards/admin-guard.guard";


export const adminRoutes: Routes = [
    { path: '', redirectTo: 'homepage', pathMatch: 'full' },
    { path: 'homepage', component: AdminHomepageComponent, canActivate:[AdminGuard] },
    { path: 'info', component: AdminInfoComponent, canActivate:[AdminGuard] },
];