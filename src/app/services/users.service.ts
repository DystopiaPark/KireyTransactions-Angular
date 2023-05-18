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

  find(email: string) {
    return this.http.get('http://localhost:3000/users?email=' + email)
  }
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
