import { Component } from '@angular/core';
import { customerLogin } from '../../Model/customerLogin';
import { UserService } from '../../services/user.service';

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
  
  constructor(private userService:UserService){}

  loginUser() {
    this.userService.loginUser(this.userlogin).subscribe({
      next:data => {
        console.log(data);
        this.customerJWT = data;
      },
      error:e => {
        console.log(e);
      }
    })

  }

}
