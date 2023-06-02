import { Component, EventEmitter, OnInit, Output  } from '@angular/core';
import { Router } from '@angular/router';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss']
})
export class HomepageComponent implements OnInit  { 
  @Output() modalClosed = new EventEmitter<void>();

  user: any;
  balance!:number;
  modalOpen:boolean = false;

  constructor(private usersService: UsersService, private router: Router) {}

  ngOnInit(): void {
    this.getUserAndAmount();
  }

  getUserAndAmount(){
    this.usersService.getUser().subscribe(
      (response: any) => {
        const responseBody = response.body;
        if (responseBody && responseBody.length > 0) {
          this.user = responseBody[0];
          this.balance = this.user.accountAmount;
        } else {
          console.error('User data not found.');
        }
      },
      (error: any) => {
        console.error('Failed to fetch user data:', error);
      }
    );
  }

  deleteUser(){
    if ( confirm(`Are you sure you want to delete ${this.user.name}?`)){
    this.usersService.deleteUser(this.user.id).subscribe(
      (response: any) => {
        console.log('User was deleted', response);
        localStorage.removeItem('userData');
        localStorage.removeItem('auth');
        this.router.navigate(['auth/signin']);
      },
      (error: any) => {
        console.error('Failed to delete user:', error);
      }
    )}
  }

  // get amount value from child component
  onAmountChanged(balance: number) {
    this.balance = balance;
  }

  openModal(): void {
    this.modalOpen = true;
  }
  closeModal(): void {
    this.modalOpen = false;
  }
}