import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { passwordPattern } from 'src/app/common/constants/passwordPattern';
import { AdminService } from 'src/app/services/admin.service';
import { AdminAuthService } from 'src/app/services/admin-auth.service';

@Component({
  selector: 'app-admin-sign-in',
  templateUrl: './admin-sign-in.component.html',
  styleUrls: ['./admin-sign-in.component.scss']
})
export class AdminSignInComponent {
  signinForm!: FormGroup;
  invalidCredentials: boolean = false;

  constructor(private adminAuth: AdminAuthService, private router: Router, private formBuilder: FormBuilder, private adminService: AdminService) {}

  ngOnInit(): void {
    this.signinForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.pattern(passwordPattern)]],
    });
  }  
  
  // LOGIN
  login(userLoginData:any) {
    this.adminService.getLoginData(userLoginData).subscribe((response:any) => { 
      
      if (response && response.body.length === 1) {
          localStorage.setItem("adminData", JSON.stringify(response.body))
          localStorage.setItem("adminAuth", JSON.stringify(this.adminAuth.isAuthenticated));
          this.adminAuth.isAuthenticated.next(true);
          this.router.navigateByUrl('/admin/homepage');
      } else {
        this.invalidCredentials = true;
        setTimeout(()=> {
          this.invalidCredentials = false;
        }, 1500)
      }
    }, err => {
      alert("something went wrong try again")
    })
  }
}
