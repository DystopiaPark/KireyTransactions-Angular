import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss']
})
export class HomepageComponent {
  constructor(private router: Router) {}

  displayModal: boolean = false;

signOut(){
  this.router.navigate(['/login']);
}



showModal() {
  this.displayModal = !this.displayModal;
  console.log(this.displayModal);
  
}
}