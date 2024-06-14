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
  spinnerVisible:boolean = false;
  activeCustomer:customer ={
    customerId:'',
    customerName: ''
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

        this.updateForm.patchValue({
          customerId:this.activeCustomer.customerId,
          customerEmail:this.activeCustomer.customerEmail,
          customerName:this.activeCustomer.customerName,
          customerPhone:this.activeCustomer.customerPhone
        })
      },
      error:e => {
        console.log("Error while fetching Customer")
        console.log(e);
      }
    })

  }

  updateForm = this.fb.group({
    customerId: [''],
    customerEmail:[{value:'', disabled:true}],
    customerName: ['', [Validators.required, Validators.minLength(3),Validators.pattern(/^[a-zA-Z ]+$/)]],
    customerPhone:[ 0 , [Validators.required]],
    
  });

  getCustomerId() {
    return this.updateForm.get('customerId')
  }


  get customerName() {
    return this.updateForm.get('customerName');
  }

  get customerPhone() {
    return this.updateForm.get('customerName');
  }
  





  onSubmit() {
    this.spinnerVisible = true;
    const customer =this.updateForm.value
    console.log(customer);

    const Jwt = this.cookieService.get("token");

    this.userService.updateCustomer(Jwt, customer).subscribe({
      next:data => {
        this.spinnerVisible = false;
        console.log("Update Success")
      },
      error:e => {
        this.spinnerVisible = false;
        console.log("Update Failed")
      }
    })


  }

  }

  


