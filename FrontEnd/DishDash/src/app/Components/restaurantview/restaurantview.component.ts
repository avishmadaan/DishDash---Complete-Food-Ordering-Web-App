import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { reduce } from 'rxjs';
import { restaurant } from '../../Model/restaurant';
import { RestaurantService } from '../../services/restaurant.service';

@Component({
  selector: 'app-restaurantview',
  templateUrl: './restaurantview.component.html',
  styleUrl: './restaurantview.component.css'
})
export class RestaurantviewComponent implements OnInit {
  oneRestaurant:restaurant;
  constructor(private ac:ActivatedRoute, private resService:RestaurantService) {}

  ngOnInit(): void {
    this.ac.paramMap.subscribe({
      next:data => {
        let restId = data.get("resid")
        console.log(restId);
        this.resService.fetchRestaurantByid(restId).subscribe({
          next:data => {
            console.log(data);
            this.oneRestaurant = data;
          }
        })

      },
      error:e => {
        console.log(e);
      }
    })
  }


}
