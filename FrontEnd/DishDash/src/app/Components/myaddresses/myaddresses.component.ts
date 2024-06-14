import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';
import { address } from '../../Model/address';
import { CookieService } from 'ngx-cookie-service';
import { v4 as uuidv4 } from 'uuid';


@Component({
  selector: 'app-myaddresses',
  templateUrl: './myaddresses.component.html',
  styleUrl: './myaddresses.component.css'
})
export class MyaddressesComponent implements OnInit {

allAddress:address[]=[];
spinnerVisible:boolean = false;
noAddresses:boolean = false;
randomUUID:string = uuidv4()


  constructor(private fb: FormBuilder, private router: Router, private userService:UserService, private cookieService:CookieService) {}

  ngOnInit(): void {
    this.fetchAllAddresses()
  }

//Fetching All Restaurants
  fetchAllAddresses() {
    this.spinnerVisible = true;
  const Jwt = this.cookieService.get('token')
  this.userService.fetchAllCustomerAddress(Jwt).subscribe({
  next:data => {
  this.allAddress = data;
  if(this.allAddress.length == 0) {
    this.noAddresses = true;
  }
  this.spinnerVisible = false;
  },

  error:e => {
  console.log("Error in fetching addresses")
  this.spinnerVisible = false;
  }

  })
  }

  //Making Address Primary
  primaryAddress(address) {
    const Jwt = this.cookieService.get('token')
    this.userService.makeItPrimary(Jwt,address).subscribe({
    next:data => {
      console.log("Done Making it primary")
      this.fetchAllAddresses()

    },
    error:e => {
      console.log("Error while makeing ir primary")
      console.log(e);
    }

  })
}

  //Deleting Address
  deleteAddress() {

  }
//Saving a new Address

  addressForm = this.fb.group({
    addressId:[this.randomUUID],
    address1: ['', Validators.required],
    landMark: ['', Validators.required],
    city: ['', Validators.required],
    pincode: [  , [Validators.required, Validators.pattern('^[0-9]{6}$')]],
    currentLocation: ['', Validators.required]
  });

  get addressId() {
    return this.addressForm.get('addressId');
  }

  get address1() {
    return this.addressForm.get('address1');
  }

  get landmark() {
    return this.addressForm.get('landmark');
  }

  get city() {
    return this.addressForm.get('city');
  }

  get pincode() {
    return this.addressForm.get('pincode');
  }

  get currentLocation() {
    return this.addressForm.get('currentLocation');
  }

  //On submitting new adress this is generated
  onSubmit() {

    const address = this.addressForm.value as address;
    console.log('Address:', address);

    const Jwt = this.cookieService.get('token');
    console.log("JWT :" +Jwt)
    this.userService.saveNewAddress(Jwt, address).subscribe({
    next:data => {
      console.log(data);
    console.log("Address Added Successfully")
    this.fetchAllAddresses();
    
    },
    error:e => {
    console.log("Error while Saving Address");
    console.log(e)
    }

    })
  }



}

