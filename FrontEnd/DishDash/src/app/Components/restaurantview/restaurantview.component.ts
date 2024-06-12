import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { restaurant } from '../../Model/restaurant';
import { RestaurantService } from '../../services/restaurant.service';
import { CookieService } from 'ngx-cookie-service';
import { MatDialog } from '@angular/material/dialog';
import { LoginalertComponent } from '../loginalert/loginalert.component';
import { UserService } from '../../services/user.service';
import { customer } from '../../Model/customer';
import { dish } from '../../Model/dish';

@Component({
  selector: 'app-restaurantview',
  templateUrl: './restaurantview.component.html',
  styleUrls: ['./restaurantview.component.css'], // Corrected styleUrls
})
export class RestaurantviewComponent implements OnInit {
  oneRestaurant: restaurant;
  categoryAndCount = new Map();
  categoryArray: [string, number][] = [];
  isFavorite: boolean = false;
  custFavorites: string[] = [];

  categoryWise =new Map();
  categoryWiseDishesArray:[string, dish[]][] = [];

  //Counter Code
  counter:number = 0;

  increaseCount() {
    this.counter++;
  }

  decreseCount() {
    this.counter--;
  }


  constructor(
    private ac: ActivatedRoute,
    private resService: RestaurantService,
    private cookieService: CookieService,
    public dialog: MatDialog,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.ac.paramMap.subscribe({
      next: data => {
        let restId = data.get('resid');
        this.fetchRestaurantById(restId);
      },
      error: e => {
        console.log(e);
      }
    });

    
  }

  fetchRestaurantById(id: string) {
    this.resService.fetchRestaurantByid(id).subscribe({
      next: data => {
        this.oneRestaurant = data;
        this.prepareMapForCategories();
        this.categoryArray = Array.from(this.categoryAndCount.entries());

        this.prepareCategoryWise();
        this.categoryWiseDishesArray = Array.from(this.categoryWise.entries());

     
        if (this.cookieService.get('token')) {
    
          this.fetchActiveCustomer()
        }
      },
      error: e => {
      
      }
    });
  }

  fetchActiveCustomer() {
    const Jwt = this.cookieService.get('token');

    this.userService.fetchCustomerFavByJwt(Jwt).subscribe({
      next:data => {
        this.custFavorites = data;
        console.log("Best Coming " +data)

        if (this.oneRestaurant && this.custFavorites.includes(this.oneRestaurant.resId)) {
                this.isFavorite = true;
              }
      },
      error:e => {
        console.log("Error in fetch cust fav")
      }
    })

  }

  toogleFav() {
    if (!this.cookieService.get('token')) {
      this.openLoginAlertDialog('3000ms', '1500ms');
      return; // Stop further execution if user is not logged in
    }

    this.isFavorite = !this.isFavorite;
    const Jwt = this.cookieService.get('token');

    if (this.isFavorite) {
      console.log("Addintion Request")
    
      this.userService.sendFavoriteRestToCustomer(this.oneRestaurant.resId, Jwt).subscribe({
        next:data => {
          console.log("Added Success")
        },
        error:e  => {
          console.log(e)
        }
      });
    } else {
      console.log("Deletion Request")
      this.userService.DeleteFavoriteRestFromCustomer(this.oneRestaurant.resId, Jwt).subscribe({
        next:data =>{
          console.log("Deletion Success")
        },
        error:e => {
          console.log("Error in deletion")
          console.log(e)
        }
      })

      // Implement functionality to remove favorite if needed
    }
  }

  openLoginAlertDialog(
    enterAnimationDuration: string,
    exitAnimationDuration: string
  ): void {
    this.dialog.open(LoginalertComponent, {
      width: '400px',
    });
  }

  prepareMapForCategories() {
    for (let category of this.oneRestaurant.resCategories) {
      let count = 0;
      for (let dish of this.oneRestaurant.resMenu) {
        if (dish.dishCategory.toLowerCase() == category.toLowerCase()) {
          count++;
        }
      }
      this.categoryAndCount.set(category, count);
    }
  }

  prepareCategoryWise() {
    let dishesInOneCategory=[]
    for(let category of this.oneRestaurant.resCategories) {
 
      for(let dish of this.oneRestaurant.resMenu) {
        if(dish.dishCategory.toLowerCase() == category.toLowerCase()) {
          dishesInOneCategory.push(dish);
        }
      }
      this.categoryWise.set(category, dishesInOneCategory)
      dishesInOneCategory=[]
      
    }
    console.log("MyDisWise Map" +dishesInOneCategory);
  }

  scrollToCateogry(category:string) {
    console.log("Scroll Called")
    const element = document.getElementById(category);
    console.log(element);

    if(element) {
      element.scrollIntoView({behavior:'smooth'})
    }
  }

}
