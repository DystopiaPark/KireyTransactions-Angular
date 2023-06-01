import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-transactionnav',
  templateUrl: './transactionnav.component.html',
  styleUrls: ['./transactionnav.component.scss']
})
export class TransactionnavComponent {

  constructor(private router: Router){}

  logout() {
    localStorage.removeItem('userData');
    localStorage.removeItem("auth");
    this.router.navigate(['auth/signin']);
  }
}
