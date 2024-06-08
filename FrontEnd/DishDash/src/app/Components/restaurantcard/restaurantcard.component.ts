import { Component, Input } from '@angular/core';
import { restaurant } from '../../Model/restaurant';

@Component({
  selector: 'app-restaurantcard',
  templateUrl: './restaurantcard.component.html',
  styleUrl: './restaurantcard.component.css'
})
export class RestaurantcardComponent {
  constructor() {}

  @Input()
  onerestaurant:restaurant;


}
