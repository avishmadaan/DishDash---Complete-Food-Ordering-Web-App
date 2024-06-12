import { Component, OnInit } from '@angular/core';
import { RestaurantService } from '../../services/restaurant.service';
import { IpLocationService } from '../../services/ip-location.service';
import { restaurant } from '../../Model/restaurant';
import { LoadingService } from '../../services/loading.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrl: './search.component.css'
})
export class SearchComponent implements OnInit {
  cityFromIp:string=''
  city:string;
  Search:string= '';
  restaurants:restaurant[];
  allUniqueCities = new Set();
  fliterRestaurants:restaurant[];
  filterWithSearch:restaurant[];

  constructor(private resService:RestaurantService, private ipService:IpLocationService, private loadingService:LoadingService ) {}
  ngOnInit(): void {

    this.ipService.getIpLocation().subscribe({
      next:data => {
        this.city = data.city
        this.cityFromIp =data.city
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
            // console.log("No such city")
            this.resService.getFilteredRestaurantList(this.fliterRestaurants);
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
      },

      error: e => {
        console.log("No Restaurant In This City");
        this.fliterRestaurants = null
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
