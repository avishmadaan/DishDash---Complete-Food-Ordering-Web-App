import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { UserService } from '../../services/user.service';
import { customer } from '../../Model/customer';
import { RouterService } from '../../services/router.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  customerJwt: string;
  activeCustomer: customer = {
    customerId: '',
    customerName: '',
    customerEmail: '',
    customerPassword: '',
  };

  constructor(private cookieService: CookieService, private userService: UserService, private routerService: RouterService) {}

  triggerFileInput() {
    const fileInput = document.getElementById('fileInput') as HTMLInputElement;
    fileInput.click();
  }

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      const file = input.files[0];
      const img = new Image();
      const reader = new FileReader();

      reader.onload = (e: any) => {
        img.src = e.target.result;

        img.onload = () => {
          if (img.width > 100 || img.height > 100) {
            alert('Profile photo should have 100 width and 100 height');
          } else {
            const profileImage = document.getElementById('profileImage') as HTMLImageElement;
            profileImage.src = e.target.result;
          }
        };
      };

      reader.readAsDataURL(file);
    }
  }

  ngOnInit(): void {
    this.customerJwt = this.cookieService.get("token");

    this.userService.fetchCustomerByJwt(this.customerJwt).subscribe({
      next: data => {
        this.activeCustomer = data;
      },
      error: data => {
        console.log("Error while fetching customer");
      }
    });
  }

  logout() {
    this.userService.loggingOutFromProfile(true);
    this.routerService.navigateToHomePage();
  }
}
