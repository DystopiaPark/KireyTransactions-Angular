import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../common/models/user';

const BASE_URL = "http://localhost:3000";

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  model = "users";

  constructor(private http: HttpClient) {}

  all(){
    return this.http.get(this.getUrl());
  }

  find(email: string) {
    return this.http.get(this.getUrlWithMail(email));
  }
  randomID(){
    return Math.floor(Math.random() * 1000000)
  }
  create (user: User) {
  user.id = this.randomID();

    // Check if the email already exists in the database
  this.http.get('http://localhost:3000/users?email=?' + user.email)
  .subscribe(
    (response: Object) => {
      console.log(Object.keys(response).length, user.email);
    
      if (Object.keys(response).length > 0) {
        // Email already exists
        console.error('Email already exists in the database.');
        // Handle error or display error message
      } else {
        // Email does not exist, proceed with user creation
        this.http.post('http://localhost:3000/users', user)
          .subscribe(
            response => {
              console.log('User created successfully:', response);
              // Handle success response here
            },
            error => {
              console.error('Error creating user:', error);
              // Handle error response here
            }
          );
      }
    },
    error => {
      console.error('Error checking email in the database:', error);
      // Handle error response here
    }
  );
  }

  update (user: any) {
    return this.http.put(this.getUrlWithMail(user.email), user)
  }

  delete(email: string) {
    return this.http.delete(this.getUrlWithMail(email));
  }


  private getUrl() {
    return `${BASE_URL}/${this.model}}`;
  }

  private getUrlWithMail(email: string){
    return `${this.getUrl()}/${email}`;
  }
}
