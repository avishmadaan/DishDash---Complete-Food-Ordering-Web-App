import { Component, OnInit } from '@angular/core';
import { restaurant } from '../../Model/restaurant';
import { RestaurantService } from '../../services/restaurant.service';

@Component({
  selector: 'app-restaurant',
  templateUrl: './restaurant.component.html',
  styleUrl: './restaurant.component.css'
})
export class RestaurantComponent implements OnInit {

  city:string;
  restaurants:restaurant[] = [];

  constructor(private resService:RestaurantService) {}

  ngOnInit(): void {
    this.resService.cityEmiter.subscribe({
      next:data => {
        this.city = data

    this.resService.restaurantsEmitter.subscribe({
      next:data => {
        console.log(data);
        this.restaurants = data
      }
    })



      }
    })
    
  }

}
