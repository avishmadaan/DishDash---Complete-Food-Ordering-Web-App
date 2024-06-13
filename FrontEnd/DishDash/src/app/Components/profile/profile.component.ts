import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { UserService } from '../../services/user.service';
import { customer } from '../../Model/customer';
import { RouterService } from '../../services/router.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent implements OnInit {
  customerJwt:string;
  constructor(private cookieservice:CookieService, private userService:UserService, private routerservice:RouterService) {}
  activeCustomer:customer ={
    customerName: '',
    customerEmail: '',
    customerPassword: '',
    customerPhone: 0
  }

  ngOnInit():void {
    
    this.routerservice.navigateToFavOption();
    this.customerJwt = this.cookieservice.get("token")

    this.userService.fetchCustomerByJwt(this.customerJwt).subscribe({
      next:data => {
        this.activeCustomer = data;
      },
      error:data => {
        console.log("Error while Fetchin Customer")
      }
    })

  }

  logout() {
    this.cookieservice.delete("token");
    this.routerservice.navigateToHomePage();
  }

}
