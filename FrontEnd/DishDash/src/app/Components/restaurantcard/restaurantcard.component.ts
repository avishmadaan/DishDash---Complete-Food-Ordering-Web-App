import { Component, Input } from '@angular/core';
import { restaurant } from '../../Model/restaurant';

@Component({
  selector: 'app-restaurantcard',
  templateUrl: './restaurantcard.component.html',
  styleUrls: ['./restaurantcard.component.css']
})
export class RestaurantcardComponent {
  @Input() onerestaurant: restaurant;
}
