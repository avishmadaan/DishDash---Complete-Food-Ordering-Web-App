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

  constructor(private cookieService:CookieService, private userService:UserService, public dialog:MatDialog){}
  isLoggedIn:boolean = false;

  ngOnInit(): void {

    if(this.cookieService.check("token")) {
      this.isLoggedIn = true
    }

    this.userService.logInSubject.subscribe({
      next:data => {
        this.isLoggedIn = data;
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

  fetchActiveCustomer(custId:string) {

  }
}
