import { Component } from '@angular/core';
import { customerLogin } from '../../Model/customerLogin';
import { RouterService } from '../../services/router.service';

@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrl: './admin-login.component.css'
})
export class AdminLoginComponent {

  adminLogin: customerLogin = {
    customerEmail: '',
    customerPassword: ''
  };

  errorMessage: string | null = null;
  isLoadingSpinner = false;

  constructor(private routerService:RouterService) {}

  loginUser() {
    if(this.adminLogin.customerEmail == "admin@dishdash.com" && this.adminLogin.customerPassword == "admin") {
      this.isLoadingSpinner = true;
      setTimeout(() => {
        this.routerService.navigateToAdminView();
        this.isLoadingSpinner = false;
      }, 2000)

    }

    else {

      this.isLoadingSpinner = false;
      this.errorMessage =  "Invalid email or password. Please try again";
      setTimeout(() => {
        this.errorMessage =  null;
      }, 3000)
  
    }

  }

}
