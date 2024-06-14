import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';
import { CookieService } from 'ngx-cookie-service';
import { customer } from '../../Model/customer';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrl: './edit-profile.component.css'
})
export class EditProfileComponent implements OnInit {

  uniqueId: string = '';
  customerJwt:string=''
  activeCustomer:customer ={
    customerName: '',
    customerEmail: '',
    customerPassword: '',
    customerPhone: 0
  }

  constructor(private fb: FormBuilder, private userService: UserService, private router: Router, private cookieService:CookieService) {}
  ngOnInit(): void {
    this.customerJwt = this.cookieService.get("token")
    this.fetchActiveCustomer()
   
  }

  //fetching Active Customer
  fetchActiveCustomer() {

    this.userService.fetchCustomerByJwt(this.customerJwt).subscribe({
      next:data => {
        this.activeCustomer = data;
      },
      error:e => {
        console.log("Error while fetching Customer")
        console.log(e);
      }
    })

  }

  updateForm = this.fb.group({
    customerName: [this.activeCustomer.customerName],
    customerPhone:[this.activeCustomer.customerPhone],
    customerPassword: [this.activeCustomer.customerPassword, [Validators.required, Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/)]],
    confirmPassword: [this.activeCustomer.customerPassword, [Validators.required, this.confirmPasswordValidator()]]
  }, { validators: this.checkPasswordMismatch });

  get customerPassword() {
    return this.updateForm.get('customerPassword');
  }
  get customerName() {
    return this.updateForm.get('customerName');
  }

  get customerPhone() {
    return this.updateForm.get('customerName');
  }
  


  get confirmPassword() {
    return this.updateForm.get('confirmPassword');
  }

  get customerProfilePic() {
    return this.updateForm.get('customerProfilePic');
  }

  generateUniqueKey() {
    const timestamp = new Date().getTime();
    const randomNumber = Math.floor(Math.random() * 1000);
    return `cus-${timestamp}-${randomNumber}`;
  }

  onSubmit() {
    if (this.updateForm.invalid) {
      return;
    }

    const registerCustomer = {
      ...this.updateForm.value,
      customerProfilePic: this.updateForm.get('customerProfilePic')!.value
    };

    console.log(registerCustomer);

    // this.userService.updateUser(registerCustomer).subscribe({
    //   next: data => {
    //     console.log('Update successful', data);
    //   },
    //   error: err => {
    //     console.log('Error updating profile', err);
    //   }
    // });
  }

  checkPasswordMismatch(c: AbstractControl) {
    const password = c.get('customerPassword');
    const confirmPass = c.get('confirmPassword');
    if (!password?.value || !confirmPass?.value) {
      return null;
    }
    return password.value === confirmPass.value ? null : { passwordMismatch: true };
  }

  confirmPasswordValidator() {
    return (control: AbstractControl) => {
      if (!control.parent || !control) {
        return null;
      }

      const password = control.parent.get('customerPassword');
      const confirmPassword = control;

      if (!password || !confirmPassword) {
        return null;
      }

      if (confirmPassword.value === '') {
        return { required: true };
      }

      if (password.value !== confirmPassword.value) {
        return { passwordMismatch: true };
      }

      return null;
    };
  }

  addAddress() {
    this.router.navigate(['/components/address-form']);
  }
  

  // updateProfile(updatedProfile: any) {
  //   this.userService.updateUser(updatedProfile).subscribe(() => {
  //     // Optionally, display a success message or navigate to another page
  //   });
  // }
}
