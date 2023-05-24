import { Component, EventEmitter, Output  } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss']
})
export class HomepageComponent  {
  data:any = this.getUserData();
  amount:number = this.data.accountAmount;

  constructor(private router: Router) {}

// getUserData from local storage logic
  getUserData() {
    let rawData: any = localStorage.getItem("userData");
    let convertedData: any = JSON.parse(rawData);
    let objectData: any = convertedData[0];
    return objectData;
  }
// onAmountChanged get value from child component logic
  onAmountChanged(amount: number) {
    this.amount = amount;
  }
// logout logic
  logout() {
    localStorage.removeItem('userData');
    localStorage.removeItem("auth");
    this.router.navigate(['auth/signin']);
  }
// modal logic
  modalOpen = false;
  @Output() modalClosed = new EventEmitter<void>();
  openModal(): void {
    this.modalOpen = true;
  }
  closeModal(): void {
    this.modalOpen = false;

  }
}