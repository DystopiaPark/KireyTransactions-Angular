import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-admin-edit-user-modal',
  templateUrl: './admin-edit-user-modal.component.html',
  styleUrls: ['./admin-edit-user-modal.component.scss']
})
export class AdminEditUserModalComponent implements OnInit {

  @Input() modalEditUserOpen = false;
  @Input() selectedUser: any;
  @Output() modalEditUserClosed = new EventEmitter<void>();

  modalHeader:string = "Edit User";
  purchaseForm!: FormGroup;
  

  constructor(private formBuilder: FormBuilder){}

  ngOnInit(): void {
    this.purchaseForm = this.formBuilder.group({
      name: new FormControl('kvak', Validators.required),
      email: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
      userId: new FormControl('', Validators.required),
      balance: new FormControl('', Validators.required),
    });
    this.purchaseForm.patchValue({
      name: this.selectedUser.name,
      email: this.selectedUser.email,
      password: this.selectedUser.password,
      userId: this.selectedUser.userId,
      balance: this.selectedUser.balance

    });
  }

  
  editUser(){}

  closeEditUserModal(): void {
    this.modalEditUserClosed.emit();
  // setTimeout(()=> {
  //   this.transactionChanged.emit(undefined);
  // }, 100);
  }
}
