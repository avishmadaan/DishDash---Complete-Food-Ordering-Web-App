import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { customer } from '../../Model/customer';
import { CookieService } from 'ngx-cookie-service';
import { RestaurantService } from '../../services/restaurant.service';
import { restaurant } from '../../Model/restaurant';

@Component({
  selector: 'app-cutomerfavourite',
  templateUrl: './cutomerfavourite.component.html',
  styleUrl: './cutomerfavourite.component.css'
})
export class CutomerfavouriteComponent implements OnInit {
  activeCustomer:customer;
  customerJwt:string;
  restIds:string[]=[];
  restaurants:restaurant[]=[];
  favRestPresent = false;


  constructor(private userService:UserService, private cookieService:CookieService, private restService:RestaurantService) {}

  ngOnInit(): void {
    this.customerJwt = this.cookieService.get("token");
    this.userService.fetchCustomerFavByJwt(this.customerJwt).subscribe({
      next:data => {
        this.restIds = data;
        if(this.restIds.length >0) {
          this.fetchRestById(this.restIds);
        }
      },
      error:e => [
        console.log("Error")
      ]
    })

   
  }

fetchRestById(restIds:string[]) {
  this.favRestPresent = true;

  for(let restId of restIds) {
    this.restService.fetchRestaurantByid(restId).subscribe({
      next:data => {
        this.restaurants.push(data);
      },

      error:e => {
        console.log("Error while fetching " +restId)
      }
    })

  }

}

  fetchCustomerFavourites() {

  }

}
