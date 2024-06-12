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

  constructor(private cookieService:CookieService, private userService:UserService, public dialog:MatDialog){}
  isLoggedIn:boolean = false;

  ngOnInit(): void {

    if(this.cookieService.check("token")) {
    
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
