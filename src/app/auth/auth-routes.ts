import { Routes } from "@angular/router";
import { SignInComponent } from "./sign-in/sign-in.component";
import { SignUprouteComponent } from "./sign-uproute/sign-uproute.component";
import { AdminSignInComponent } from "./admin-sign-in/admin-sign-in.component";

export const authRoutes: Routes = [
  { path: '', redirectTo: '/auth/signin', pathMatch: 'full' },
  { path: 'signin', component: SignInComponent },
  { path: 'signup', component: SignUprouteComponent },
  { path: 'signinadmin', component: AdminSignInComponent}
];