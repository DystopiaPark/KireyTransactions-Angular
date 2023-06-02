import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { Observable, tap } from "rxjs";
import { AdminAuthService } from "src/app/services/admin-auth.service";

@Injectable({
  providedIn: "root",
})

export class AdminGuard implements CanActivate {
  constructor (private authService: AdminAuthService, private router: Router) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
): 
  | Observable<boolean | UrlTree> 
  | Promise<boolean | UrlTree>
  | boolean
  | UrlTree {
    return this.authService.isAuthenticated$.pipe(
      tap((isAuthenticated) => {
        if(!isAuthenticated) {
          console.log("Is not authenticated, route to auth/signinadmin!", isAuthenticated);
          this.router.navigateByUrl("/auth/signinadmin");
        }
        console.log("Is authenticated, route to main/homepage!", isAuthenticated);
        return isAuthenticated;
      })
    )
  }
}
