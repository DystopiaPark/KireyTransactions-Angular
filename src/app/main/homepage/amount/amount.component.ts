import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-amount',
  templateUrl: './amount.component.html',
  styleUrls: ['./amount.component.scss']
})
export class AmountComponent implements OnInit {
  
  @Input() data: any;
  amount!: number;
  modalHeader = "Set new amount"
  signupForm!: FormGroup;

  constructor(private http: HttpClient, private formBuilder: FormBuilder, private usersService: UsersService){}

  ngOnInit(): void {
    this.amount = this.data.accountAmount;
    this.signupForm = this.formBuilder.group({
    amount: ['', Validators.required]
  }); 
  }  
  

  @Output() amountChanged = new EventEmitter<number>();

  // saveAmount in local storage, json server and ship it to parent component to be rendered
  saveAmount () {
  let receivedData = this.usersService.getUser(this.data);
  const urlPut = `http://localhost:3000/users/${this.data.id}`;
  receivedData.subscribe(
    (response: any) => {
      console.log(this.data.email);
      const responseBody = response.body;
      const concreteObject = response.body[0];
      const updatedObject = { ...concreteObject, accountAmount: this.amount };
      responseBody.shift();
      responseBody.push(updatedObject)
      // server  
      this.http.put(urlPut, updatedObject).subscribe(
        response => {
          console.log('Amount updated successfully:', response);
            // parent component
            this.amountChanged.emit(this.amount);
          // local storage
            localStorage.setItem("userData", JSON.stringify(responseBody))
        },
        error => {
          console.error('Failed to update amount:', error);
        }
      );
    },
    error => {
      console.error('Failed to retrieve object:', error);
    }
  );
  this.closeModal();
  }

  // MODAL
  @Input() modalOpen = false;
  @Output() modalClosed = new EventEmitter<void>();
  closeModal(): void {
    this.modalClosed.emit();
  }
}
