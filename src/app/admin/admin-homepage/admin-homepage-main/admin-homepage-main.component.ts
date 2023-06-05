import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Observable, Subscription, interval, switchMap } from 'rxjs';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-admin-homepage-main',
  templateUrl: './admin-homepage-main.component.html',
  styleUrls: ['./admin-homepage-main.component.scss']
})
export class AdminHomepageMainComponent implements OnInit {
  usersArray!: any;
  private dataSubscription!: Subscription;

  constructor (private usersService: UsersService){}

  ngOnInit(): void {
    this.getUsers();
    this.dataSubscription = this.usersService.getUpdatedUsers().subscribe(updatedUsers => {
      this.usersArray = updatedUsers;
    });
  }

  getUsers(){
    this.usersService.getUsers().subscribe(
      (response) => {
        this.usersArray = response;
        console.log(this.usersArray);
        console.log(response);
      }
    )
  }

  storeSelectedUser(user:any){}

  deleteUser(user:any){
    this.usersService.deleteUser(user.id).subscribe(
      (response) => {
        console.log("User deleted!");
        this.getUsers();
      }
    )
  }
  ngOnDestroy() {
    this.dataSubscription.unsubscribe();
  }

  openEditModal(){}
  openTransactionsModal(){}
  viewTransactions(user:any){}
}
