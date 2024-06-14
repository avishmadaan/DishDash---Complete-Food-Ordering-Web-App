import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { UserService } from '../../services/user.service';
import { MatDialog } from '@angular/material/dialog';
import { LoginComponent } from '../login/login.component';
import { customer } from '../../Model/customer';
import { RegisterComponent } from '../register/register.component';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent implements OnInit {

  activeCustomer:customer;
  customerJwt:string;
  matBadge:number =5;
  showCart:boolean = false;

  logoutMessageVisible: boolean = false;
  loading: boolean = false; // Loading indicator

  constructor(private cookieService:CookieService, private userService:UserService, public dialog:MatDialog){}
  isLoggedIn:boolean = false;

  ngOnInit(): void {

    if(this.cookieService.check("token")) {
    
      this.customerJwt = this.cookieService.get("token")
      console.log("Jwt: "+this.customerJwt);
      this.fetchActiveCustomer();
    }

    this.userService.tokenSubject.subscribe({
      next:data => {
        console.log("You got this data " +data)
        if(!data) {
          this.logout()
          console.log("We did logout")
        }
      },
      error:e => {
        console.log("Error in getting toke")
        console.log(e)
      }
    })

    this.userService.logInSubject.subscribe({
      next:data => {
        this.isLoggedIn = data;
        this.customerJwt = this.cookieService.get("token")
        this.fetchActiveCustomer();
      }
    })

    this.userService.loggedOutFromProfileSubject.subscribe({
      next:data => {
        if(true) {
          this.logout()
        }
      },
      error:e => {
        console.log("Error while logging out ")
        console.log(e);
      }
    })
  }

  logout() {
    this.cookieService.delete("token");
    this.loading = true; // Show loading indicator
    setTimeout(() => {
      this.cookieService.delete("token");
      this.isLoggedIn = false;
      this.loading = false; // Hide loading indicator
    }, 1000); // Simulate a 1-second delay for logout process
  }

  showLogoutMessage() {
    this.logoutMessageVisible = true;
    setTimeout(() => {
      this.logoutMessageVisible = false;
    }, 3000); // Hide message after 3 seconds
  }

  openLoginDialog(enterAnimationDuration: string, exitAnimationDuration: string):void {
    this.dialog.open(LoginComponent, {
      width: "400px"
    })
  }

  openSignupDialog(enterAnimationDuration: string, exitAnimationDuration: string):void {
    this.dialog.open(RegisterComponent, {
      width: "400px"
    })
  }

  fetchActiveCustomer() {
   
    this.userService.fetchCustomerByJwt(this.customerJwt).subscribe({
      next:data => {
    
        this.activeCustomer = data
        this.isLoggedIn = true
        console.log(data)
        
      },
      error:e => {
        console.log(e);

      }
    })
  }



}
