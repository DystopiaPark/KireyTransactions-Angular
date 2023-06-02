import { Component, OnInit } from '@angular/core';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-admin-homepage-main',
  templateUrl: './admin-homepage-main.component.html',
  styleUrls: ['./admin-homepage-main.component.scss']
})
export class AdminHomepageMainComponent implements OnInit {
  users!: any;

  constructor (private usersService: UsersService){}

  ngOnInit(): void {
    this.getUsers();
  }

  getUsers(){
    this.usersService.getUsers().subscribe(
      (response) => {
        this.users = response;
        console.log(this.users);
        console.log(response);
      }
    )
  }
}
