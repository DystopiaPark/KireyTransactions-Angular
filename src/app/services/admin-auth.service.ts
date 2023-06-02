import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminAuthService {
  isAuthenticated = new BehaviorSubject(this.getIsAuthenticated() || false);
  isAuthenticated$ = this.isAuthenticated.asObservable();

  private getIsAuthenticated(): boolean {
    console.log("Got Admin authentication");
    return JSON.parse(localStorage.getItem("adminAuth")!);
  }
}