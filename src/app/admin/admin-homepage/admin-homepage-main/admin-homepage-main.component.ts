import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Subscription } from 'rxjs';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-admin-homepage-main',
  templateUrl: './admin-homepage-main.component.html',
  styleUrls: ['./admin-homepage-main.component.scss']
})
export class AdminHomepageMainComponent implements OnInit {
  @Output() modalEditUserClosed = new EventEmitter<void>();

  usersArray!: any;
  private dataSubscription!: Subscription;
  modalEditUserOpen: boolean = false;
  selectedUser: any;

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

  storeSelectedUser(user:any){
    this.selectedUser = user;
  }

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

  openTransactionsModal(){}
  viewTransactions(user:any){}

  openEditUserModal(): void{
    this.modalEditUserOpen = true;
  }
  closeEditModal(): void {
    this.modalEditUserOpen = false;
  }
}
