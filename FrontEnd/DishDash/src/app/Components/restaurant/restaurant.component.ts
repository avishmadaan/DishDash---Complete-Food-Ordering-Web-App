import { Component, OnInit } from '@angular/core';
import { restaurant } from '../../Model/restaurant';
import { RestaurantService } from '../../services/restaurant.service';
import { LoadingService } from '../../services/loading.service';

@Component({
  selector: 'app-restaurant',
  templateUrl: './restaurant.component.html',
  styleUrl: './restaurant.component.css'
})
export class RestaurantComponent implements OnInit {

  city:string;
  restaurants:restaurant[] = [];
  spinnerVisible:boolean = false;
  noRestuarant:boolean = false;

  constructor(private resService:RestaurantService) {}

  ngOnInit(): void {
    this.resService.cityEmiter.subscribe({
      next:data => {
        this.city = data

  this.spinnerVisible = true
  this.noRestuarant=false
    this.resService.restaurantsEmitter.subscribe({
      next:data => {
        console.log(data);
        if(data) {
          this.restaurants = data
          this.noRestuarant=false
          console.log("happening something")
        }
        else {
          this.noRestuarant = true
          this.restaurants=[]
        }
    this.spinnerVisible = false
    
      },
      error:e => {
        console.log("Not received anything")
        this.spinnerVisible = false
      }
    })

      }
    })
    
  }

}
