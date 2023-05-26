import { Component, EventEmitter, OnInit, Output  } from '@angular/core';
import { Router } from '@angular/router';
import { UsersService } from 'src/app/services/users.service';


@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss']
})
export class HomepageComponent implements OnInit  {
  user!: any;
  amount!:number;

  ngOnInit(): void {
    this.usersService.getUser().subscribe(
      (response: any) => {
        const responseBody = response.body;
        if (responseBody && responseBody.length > 0) {
          this.user = responseBody[0];
          this.amount = this.user.accountAmount;
        } else {
          console.error('User data not found.');
        }
      },
      (error: any) => {
        console.error('Failed to fetch user data:', error);
      }
    );
  }

  logStuff(){
    console.log(this.user);
    console.log(this.user.accountAmount);
    console.log(this.amount);
  }

  constructor(private router: Router, private usersService: UsersService) {}

// onAmountChanged get value from child component
  onAmountChanged(amount: number) {
    this.amount = amount;
  }
// logout 
  logout() {
    localStorage.removeItem('userData');
    localStorage.removeItem("auth");
    localStorage.removeItem("currUser");
    this.router.navigate(['auth/signin']);
  }
// modal 
  modalOpen = false;
  @Output() modalClosed = new EventEmitter<void>();
  openModal(): void {
    this.modalOpen = true;
  }
  closeModal(): void {
    this.modalOpen = false;
  }
}