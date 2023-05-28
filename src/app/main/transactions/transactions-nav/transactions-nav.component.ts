import { Component, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-transactions-nav',
  templateUrl: './transactions-nav.component.html',
  styleUrls: ['./transactions-nav.component.scss']
})
export class TransactionsNavComponent {

  constructor(private router: Router){}

  logout() {
    localStorage.removeItem('userData');
    localStorage.removeItem("auth");
    this.router.navigate(['auth/signin']);
  }

  // ADD TRANSACTION MODAL
  modalOpen = false;
  @Output() modalClosed = new EventEmitter<void>();
  openModal(): void {
    this.modalOpen = true;    
  }
  closeModal(): void {
    this.modalOpen = false;
  }
}
