import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { reduce } from 'rxjs';
import { restaurant } from '../../Model/restaurant';
import { RestaurantService } from '../../services/restaurant.service';
import { CookieService } from 'ngx-cookie-service';
import { Dialog } from '@angular/cdk/dialog';
import { LoginalertComponent } from '../loginalert/loginalert.component';

@Component({
  selector: 'app-restaurantview',
  templateUrl: './restaurantview.component.html',
  styleUrl: './restaurantview.component.css'
})
export class RestaurantviewComponent implements OnInit {

  oneRestaurant:restaurant;
  categoryAndCount = new Map();
  categoryArray:[string, number][]=[];

  constructor(private ac:ActivatedRoute, private resService:RestaurantService, private cookieService:CookieService, private dialog:Dialog) {}

  ngOnInit(): void {
    this.ac.paramMap.subscribe({
      next:data => {
        let restId = data.get("resid")
        console.log(restId);
        this.resService.fetchRestaurantByid(restId).subscribe({
          next:data => {
            console.log(data);
            this.oneRestaurant = data;
            this.prepareMapForCategories();
            this.categoryArray = Array.from(this.categoryAndCount.entries())
            console.log(this.categoryArray);
          }
        })

      },
      error:e => {
        console.log(e);
      }
    })
  }

  toogleFav() {
if(!this.cookieService.get("token")) {
this.dialog.open(LoginalertComponent)
}
  }

  prepareMapForCategories() {
    
   
    for(let cateogry of this.oneRestaurant.resCategories) {
      let count =0
      for(let dish of this.oneRestaurant.resMenu) {
        if(dish.dishCategory.toLowerCase() == cateogry.toLowerCase()) {
          count++;
        }
      }
      this.categoryAndCount.set(cateogry,count);
    }
  
  }


}
