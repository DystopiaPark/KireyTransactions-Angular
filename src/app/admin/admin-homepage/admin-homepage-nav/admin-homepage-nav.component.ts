import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-homepage-nav',
  templateUrl: './admin-homepage-nav.component.html',
  styleUrls: ['./admin-homepage-nav.component.scss']
})
export class AdminHomepageNavComponent {
  constructor(private router: Router){}

  logout() {
    localStorage.removeItem('adminData');
    localStorage.removeItem('adminAuth');
    this.router.navigate(['auth/signin']);
  }
}
