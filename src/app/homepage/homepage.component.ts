import { Component, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss']
})
export class HomepageComponent {
  constructor(private router: Router) {}

  logout() {
    localStorage.removeItem('userData');
    this.router.navigate(['login']);
  }

  kvak() {
    let rawData: any = localStorage.getItem("userData");
    let convertedData: any = JSON.parse(rawData);
    let objectData: any = convertedData[0]
    return objectData;
  }

  data:any = this.kvak();

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