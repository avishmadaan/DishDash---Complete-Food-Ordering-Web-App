import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { UserService } from '../../services/user.service';
import { MatDialog } from '@angular/material/dialog';
import { LoginComponent } from '../login/login.component';
import { customer } from '../../Model/customer';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent implements OnInit {

  activeCustomer:customer;
  customerJwt:string;

  constructor(private cookieService:CookieService, private userService:UserService, public dialog:MatDialog){}
  isLoggedIn:boolean = false;

  ngOnInit(): void {

    if(this.cookieService.check("token")) {
      this.isLoggedIn = true
      this.customerJwt = this.cookieService.get("token")
      console.log("Jwt: "+this.customerJwt);
      this.fetchActiveCustomer();
    }

    this.userService.logInSubject.subscribe({
      next:data => {
        this.isLoggedIn = data;
        this.customerJwt = this.cookieService.get("token")
        this.fetchActiveCustomer();
      }
    })
  }

  logout() {
    this.cookieService.delete("token");
    this.isLoggedIn=false;
  }

  openLoginDialog(enterAnimationDuration: string, exitAnimationDuration: string):void {
    this.dialog.open(LoginComponent, {
      width: "400px"
    })
  }

  fetchActiveCustomer() {
    console.log("Fetch called")
    console.log("Inside fetc jwt :" +this.customerJwt);
    this.userService.fetchCustomerByJwt(this.customerJwt).subscribe({
      next:data => {
        this.activeCustomer = data
        console.log(data);
      },
      error:e => {
        console.log(e);

      }
    })
  }
}
