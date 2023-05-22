import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../common/models/user';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  model = "users";

  constructor(private http: HttpClient) {}

  randomID(){
    return Math.floor(Math.random() * 1000000)
  }

  create (user: User) {
  user.id = this.randomID();
  this.http.get('http://localhost:3000/users?email=' + user.email)
  .subscribe(
    (response: Object) => { 
      if (Object.keys(response).length > 0) {
        console.error('Email already exists in the database.');
        alert(`${user.email} already exists in the database!`)
      } else {
        this.http.post('http://localhost:3000/users', user)
          .subscribe(
            response => {
              console.log('User created successfully:', response);
            },
            error => {
              console.error('Error creating user:', error);
            }
          );
      }
    },
    error => {
      console.error('Error checking email in the database:', error);
    }
  );
  }
}