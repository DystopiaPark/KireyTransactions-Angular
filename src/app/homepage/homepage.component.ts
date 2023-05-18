import { Component, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss']
})
export class HomepageComponent {
  constructor(private router: Router) {}

signOut(){
  this.router.navigate(['/login']);
  // this.sessionStorageService.remove('key');
}



// MODAL
  modalOpen = false;
  @Output() modalClosed = new EventEmitter<void>();
  openModal(): void {
    this.modalOpen = true;
  }
  closeModal(): void {
    this.modalOpen = false;
  }
}