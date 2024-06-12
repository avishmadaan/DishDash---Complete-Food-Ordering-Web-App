import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrl: './edit-profile.component.css'
})
export class EditProfileComponent {
  uniqueId: string = '';

  constructor(private fb: FormBuilder, private userService: UserService, private router: Router) {}

  registerForm = this.fb.group({
    customerProfilePic: [''],
    customerPassword: ['', [Validators.required, Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/)]],
    confirmPassword: ['', [Validators.required, this.confirmPasswordValidator()]]
  }, { validators: this.checkPasswordMismatch });

  get customerPassword() {
    return this.registerForm.get('customerPassword');
  }

  get confirmPassword() {
    return this.registerForm.get('confirmPassword');
  }

  get customerProfilePic() {
    return this.registerForm.get('customerProfilePic');
  }

  generateUniqueKey() {
    const timestamp = new Date().getTime();
    const randomNumber = Math.floor(Math.random() * 1000);
    return `cus-${timestamp}-${randomNumber}`;
  }

  onSubmit() {
    if (this.registerForm.invalid) {
      return;
    }

    const registerCustomer = {
      ...this.registerForm.value,
      customerProfilePic: this.registerForm.get('customerProfilePic')!.value
    };

    console.log(registerCustomer);

    this.userService.updateUser(registerCustomer).subscribe({
      next: data => {
        console.log('Update successful', data);
      },
      error: err => {
        console.log('Error updating profile', err);
      }
    });
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
  

  updateProfile(updatedProfile: any) {
    this.userService.updateUser(updatedProfile).subscribe(() => {
      // Optionally, display a success message or navigate to another page
    });
  }
}
