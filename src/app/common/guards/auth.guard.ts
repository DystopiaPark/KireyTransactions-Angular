import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { Observable, tap } from "rxjs";
import { AuthService } from "src/app/services/auth.service";

@Injectable({
  providedIn: "root",
})

export class AuthGuard implements CanActivate {
  constructor (private authService: AuthService, private router: Router) {}

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
          console.log("Is not authenticated, route to /login!", isAuthenticated);
          this.router.navigateByUrl("/login");
        }
        console.log("Is authenticated, route to /home!", isAuthenticated);
        return isAuthenticated;
        
      })
    )
  }
      
  }
