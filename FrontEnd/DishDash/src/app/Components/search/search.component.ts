import { Component, OnInit } from '@angular/core';
import { RestaurantService } from '../../services/restaurant.service';
import { IpLocationService } from '../../services/ip-location.service';
import { restaurant } from '../../Model/restaurant';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrl: './search.component.css'
})
export class SearchComponent implements OnInit {

  city:string;
  Search:string= '';
  restaurants:restaurant[];
  allUniqueCities = new Set();
  fliterRestaurants:restaurant[];
  filterWithSearch:restaurant[];

  constructor(private resService:RestaurantService, private ipService:IpLocationService ) {}
  ngOnInit(): void {

    this.ipService.getIpLocation().subscribe({
      next:data => {
        this.city = data.city
        this.updateCity(this.city)

        this.resService.fetchAllRestaurants().subscribe({
          next:data => {
            this.restaurants = data
            for( let rest of this.restaurants) {
              this.allUniqueCities.add(rest.resCity);
            }
          }
        })
        this.resService.fetchRestaurantsByCity(this.city).subscribe({
          next:data => {
            this.fliterRestaurants = data
            this.resService.getFilteredRestaurantList(this.fliterRestaurants);
          },
          error:e => {
            console.log(e);
          }
        })
      }
    })
  
   
  }

  updateCity(city:string) {
    this.resService.updateCity(city);

  }
  selectCity(city:any) {
    this.city = city;
    this.updateCity(this.city);
    
    this.resService.fetchRestaurantsByCity(this.city).subscribe({
      next:data => {
        this.fliterRestaurants = data

        this.sendFilteredData(this.fliterRestaurants);
      }
    })

  }

  sendFilteredData(rest:restaurant[]) {
    this.resService.getFilteredRestaurantList(rest);
  }

  onSearch(){

    let tempRest: restaurant[] = this.fliterRestaurants.filter((value) => 
      value.resName.toLowerCase().includes(this.Search.toLowerCase())
    );

    this.filterWithSearch = tempRest;
    this.sendFilteredData(this.filterWithSearch);
    
  }

}
