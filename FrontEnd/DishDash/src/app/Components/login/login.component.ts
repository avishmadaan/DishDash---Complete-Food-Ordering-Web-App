import { Component } from '@angular/core';
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
export class LoginComponent {

  userlogin:customerLogin = {
    customerEmail: '',
    customerPassword : ''
  };

  customerJWT:string
  errorMessage:string | null = null;
  isLoadingSpinner = false;
  
  constructor(private userService:UserService, private cookieService: CookieService, public dialog:MatDialog, public dialogRef:MatDialogRef<LoginComponent>, public loadingSevice:LoadingService
  ){}

  loginUser() {
    this.isLoadingSpinner = true;
    this.userService.loginUser(this.userlogin).subscribe({
      next:data => {
    this.isLoadingSpinner = false
        console.log(data);
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
