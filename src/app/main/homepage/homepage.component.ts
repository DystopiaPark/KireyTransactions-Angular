import { Component, EventEmitter, OnInit, Output  } from '@angular/core';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss']
})
export class HomepageComponent implements OnInit  {
  user: any;
  amount!:number;
  modalOpen:boolean = false;


  ngOnInit(): void {
    this.getUserAndAmount();
  }

  constructor(private usersService: UsersService) {}

  getUserAndAmount(){
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

// onAmountChanged get value from child component
  onAmountChanged(amount: number) {
    this.amount = amount;
  }

// modal 
  @Output() modalClosed = new EventEmitter<void>();
  openModal(): void {
    this.modalOpen = true;
  }
  closeModal(): void {
    this.modalOpen = false;
  }
}