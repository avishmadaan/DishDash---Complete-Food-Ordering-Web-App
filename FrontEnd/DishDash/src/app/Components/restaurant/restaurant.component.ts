import { Component, OnInit } from '@angular/core';
import { restaurant } from '../../Model/restaurant';
import { RestaurantService } from '../../services/restaurant.service';

@Component({
  selector: 'app-restaurant',
  templateUrl: './restaurant.component.html',
  styleUrl: './restaurant.component.css'
})
export class RestaurantComponent implements OnInit {

  restaurants:restaurant[] = [];

  constructor(private resService:RestaurantService) {}

  ngOnInit(): void {
    this.resService.fetchRestaurantsByCity().subscribe({
      next:data => {
        console.log(data);
        this.restaurants = data
      }
    })
  }

}
