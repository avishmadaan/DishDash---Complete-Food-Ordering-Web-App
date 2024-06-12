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
  uniqueId:string = ''
    constructor(private fb:FormBuilder, private userService:UserService,private router:Router){}


    registerForm=this.fb.group({
      customerProfilePic:[''],
      customerPassword:['',[Validators.required,Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/)]],
      confirmPassword:['',[Validators.required,Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/)]],
      // customerAddress:this.fb.group({
      //   address1: [''],
      //   landMark: [''],
      //   city: [''],
      //   pinCode: [''],
      //   currentLocation: ['']
      // })
    },{validators:this.checkPassowrdMisMatch})

    get customerPassword()
    {
      return this.registerForm.get('customerPassword');
    }

    get confirmPassword()
    {
      return this.registerForm.get('confirmPassword');
    }

    get customerProfilePic()
    {
      return this.registerForm.get('customerProfilePic');
    }
    generateUniqueKey() {
      const timestamp = new Date().getTime;

      const randomNumber = Math.floor(Math.random()*1000);

      return `cus-${timestamp}-${randomNumber}`
    }
    
    // onSubmit ()
    // {
    //   let registerCustomer:any=this.registerForm.value as any;
    //   console.log(registerCustomer);
    //   this.userService.registerUser(registerCustomer).subscribe({
    //     next:data=>{
    //         console.log(data);
    //     },
    //     error:err=>{
    //         console.log("Error",err);
            
    //     }
    //   })
      
    // }
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
          // Optionally navigate to another page or show a success message
        },
        error: err => {
          console.log('Error updating profile', err);
          // Optionally show an error message
        }
      });
    }
    checkPassowrdMisMatch(c:AbstractControl)
    {
      const password=c.get('customerPassword');
      console.log(password);
      
      const confirmPass=c.get('confirmPassword');
      console.log(confirmPass);
      if (!password?.value || !confirmPass?.value) {
        return null;
      }
      console.log(password.value === confirmPass.value ? null : { passwordMismatch: true });
      
  
      return password.value === confirmPass.value ? null : { passwordMismatch: true };
    }

  addAddress() {
    this.router.navigate(['/address-form']);
  }

}
