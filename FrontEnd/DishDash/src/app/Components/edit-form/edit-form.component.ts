import { Component } from '@angular/core';
import { FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-edit-form',
  templateUrl: './edit-form.component.html',
  styleUrl: './edit-form.component.css'
})
export class EditFormComponent {

  uniqueId:string = ''
    constructor(private fb:FormBuilder, private userService:UserService){}


    editForm=this.fb.group({
      customerName:['',[Validators.required,Validators.minLength(3),Validators.pattern(/^[a-zA-Z ]+$/)]],
      customerEmail:['',[Validators.required,Validators.pattern(/^\S+@\S+\.\S+$/)]],
      customerPassword:['',[Validators.required,Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/)]],
      confirmPassword:['',[Validators.required,Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/)]],
      customerProfilePic:[''],
      customerPhone:['',[Validators.required,Validators.pattern(/^[6789]\d{9}$/)]]
      // customerAddress:this.fb.group({
      //   address1: [''],
      //   landMark: [''],
      //   city: [''],
      //   pinCode: [''],
      //   currentLocation: ['']
      // })
    },{validators:this.checkPassowrdMisMatch})

    get customerId()
    {
      return this.editForm.get('customerId');
    }
    get customerName(){
      return this.editForm.get('customerName');
    }

    get customerEmail()
    {
      return this.editForm.get('custonerEmail');
    }

    get customerPassword()
    {
      return this.editForm.get('customerPassword');
    }

    get confirmPassword()
    {
      return this.editForm.get('confirmPassword');
    }

    get customerProfilePic()
    {
      return this.editForm.get('customerProfilePic');
    }

    get customerPhone()
    {
      return this.editForm.get('customerPhone');
    }

    get address1()
    {
      return this.editForm.get('customerAddress.address1');
    }
    get landmark()
    {
      return this.editForm.get('customerAddress.landmark');
    }
    get city()
    {
      return this.editForm.get('customerAddress.city');
    }
    get pinCode()
    {
      return this.editForm.get('customerAddress.pinCode');
    }
    get currentLocation()
    {
      return this.editForm.get('customerAddress.currentLocation');
    }

    generateUniqueKey() {
      const timestamp = new Date().getTime;

      const randomNumber = Math.floor(Math.random()*1000);

      return `cus-${timestamp}-${randomNumber}`
    }
    
    onSubmit ()
    {
      let registerCustomer:any=this.editForm.value as any;
      console.log(registerCustomer);
      this.userService.registerUser(registerCustomer).subscribe({
        next:data=>{
            console.log(data);
        },
        error:err=>{
            console.log("Error",err);
            
        }
      })
      
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
}


