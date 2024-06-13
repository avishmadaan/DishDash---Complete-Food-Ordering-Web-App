import { Component, OnInit } from '@angular/core';
import { customerLogin } from '../../Model/customerLogin';
import { UserService } from '../../services/user.service';
import { CookieService } from 'ngx-cookie-service';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { LoadingService } from '../../services/loading.service';
import { RegisterComponent } from '../register/register.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {

  userlogin:customerLogin = {
    customerEmail: '',
    customerPassword : ''
  };

  customerJWT:string
  errorMessage:string | null = null;
  isLoadingSpinner = false;
  
  constructor(private userService:UserService, private cookieService: CookieService, public dialog:MatDialog, public dialogRef:MatDialogRef<LoginComponent>, public loadingSevice:LoadingService
  ){}
  ngOnInit(): void {
    this.userService.listenLogin.subscribe({
      next:data => {
        this.loginUser(data);
      },

      error:e => {
console.log(e);
      }
    })
   
  }

  loginUser(userlogin:customerLogin) {
    this.isLoadingSpinner = true;
    this.userService.loginUser(userlogin).subscribe({
      next:data => {
    this.isLoadingSpinner = false
        console.log("My JWT "+data);
        this.customerJWT = data;
        this.cookieService.set("token",this.customerJWT);
        this.afterLogin();
        this.closeDialoge();
      },
      error:e => {
      this.isLoadingSpinner = false
        console.log(e);
        this.errorMessage = "Invalid email or password. Please try again"
      }
    })

  }

  afterLogin() {
    this.userService.login(true)

  }

  openRegister() {
    this.dialog.open(RegisterComponent, {
      width: "400px"
    })

    this.closeDialoge()
  }

  closeDialoge() {
    this.dialogRef.close();
  }

}
