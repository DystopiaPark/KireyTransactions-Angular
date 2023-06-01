import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-amount',
  templateUrl: './amount.component.html',
  styleUrls: ['./amount.component.scss']
})
export class AmountComponent implements OnInit {
  @Input() modalOpen = false;
  @Input() balance!: number;
  @Output() balanceChanged = new EventEmitter<number>();
  @Output() modalClosed = new EventEmitter<void>();

  user!:any;
  modalHeader:string = "Set new amount";
  amountForm!:FormGroup;

  constructor(private formBuilder: FormBuilder, private usersService: UsersService){}

  ngOnInit(): void {
    this.getUserAndAmount();
  }

  initializeForm(): void {
    this.amountForm = this.formBuilder.group({
      amount: [this.balance, Validators.required]
    });
  }

  getUserAndAmount(){
    this.usersService.getUser().subscribe(
      (response: any) => {
        const responseBody = response.body;
        if (responseBody && responseBody.length > 0) {
          this.user = responseBody[0];
          this.balance = this.user.accountAmount;
          this.initializeForm();
        } else {
          console.error('User data not found.');
        }
      },
      (error: any) => {
        console.error('Failed to fetch user data:', error);
      }
    );
  }

  updateAmount(): void {
    if (this.amountForm.valid) {
      const updatedObject = { ...this.user, accountAmount: this.amountForm.value.amount };
      this.usersService.editUser(this.user, updatedObject).subscribe(
        response => {
          console.log('Amount updated successfully:', response);
          this.balanceChanged.emit(this.amountForm.value.amount);
        },
        error => {
          console.error('Failed to update amount:', error);
        }
      );
    }
    this.closeModal();
  }

  closeModal(): void {
    this.modalClosed.emit();
  }
}
