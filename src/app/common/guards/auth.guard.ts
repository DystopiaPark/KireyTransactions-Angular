import { CanActivateFn } from '@angular/router';
import { Router } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
  const router = new Router;
  const userData = localStorage.getItem('userData');
  if (userData) {
    // User data exists, allow access to the route
    return true;
  } else {
    // User data does not exist, deny access and navigate to the login route
    router.navigate(['/login']);
    return false;
  }
};