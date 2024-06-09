import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { RegisterService } from '../../services/register.service';
import { customer } from '../../Model/customer';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
    constructor(private fb:FormBuilder, private registerService:RegisterService){}
    registerForm=this.fb.group({
      customerName:['',[Validators.required,Validators.minLength(3),Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])$/)]],
      customerEmail:['',[Validators.required,Validators.pattern(/^\S+@\S+\.\S+$/)]],
      customerPassword:['',[Validators.required,Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/)]],
      confirmPassword:['',[Validators.required,Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/)]],
      customerProfilePic:[''],
      customerPhone:['',[Validators.required,Validators.pattern(/^[6789]\d{9}$/)]],
      customerAddress:this.fb.group({
        address1: [''],
        landMark: [''],
        city: [''],
        pinCode: [''],
        currentLocation: ['']
      })
    });

    get customerName(){
      return this.registerForm.get('customerName');
    }

    get customerEmail()
    {
      return this.registerForm.get('custonerEmail');
    }

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

    get customerPhone()
    {
      return this.registerForm.get('customerPhone');
    }

    get address1()
    {
      return this.registerForm.get('customerAddress.address1');
    }
    get landmark()
    {
      return this.registerForm.get('customerAddress.landmark');
    }
    get city()
    {
      return this.registerForm.get('customerAddress.city');
    }
    get pinCode()
    {
      return this.registerForm.get('customerAddress.pinCode');
    }
    get currentLocation()
    {
      return this.registerForm.get('customerAddress.currentLocation');
    }
    
    onSubmit()
    {

    }
}
