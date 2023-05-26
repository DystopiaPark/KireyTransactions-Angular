import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-amount',
  templateUrl: './amount.component.html',
  styleUrls: ['./amount.component.scss']
})
export class AmountComponent implements OnInit {
  amount!:number;
  user!: any;
  modalHeader = "Set new amount"
  amountForm!: FormGroup;

  constructor(private formBuilder: FormBuilder, private usersService: UsersService){}

  ngOnInit(): void {
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

    this.amountForm = this.formBuilder.group({
    amount: new FormControl(this.amount, [ Validators.required])
  }); 
  }  
  
  @Output() amountChanged = new EventEmitter<number>();

  // saveAmount in local storage, json server and ship it to parent component to be rendered
  saveAmount () {
    this.usersService.getUser().subscribe(
    (response: any) => {
      const responseBody = response.body;
      const concreteObject = response.body[0];
      const updatedObject = { ...concreteObject, accountAmount: this.amount };
      responseBody.shift();
      responseBody.push(updatedObject)
      // server  
      this.usersService.editUser(this.user, updatedObject).subscribe(
        response => {
          console.log('Amount updated successfully:', response);
            // parent component
            this.amountChanged.emit(this.amount);
          // local storage
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
