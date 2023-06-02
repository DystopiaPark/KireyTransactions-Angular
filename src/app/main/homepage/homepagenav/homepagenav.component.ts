import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-homepagenav',
  templateUrl: './homepagenav.component.html',
  styleUrls: ['./homepagenav.component.scss']
})
export class HomepagenavComponent {

  constructor(private router: Router){}

  logout() {
    localStorage.removeItem('userData');
    localStorage.removeItem('auth');
    this.router.navigate(['auth/signin']);
  }
}
