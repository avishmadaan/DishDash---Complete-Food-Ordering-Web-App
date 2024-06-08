import { Injectable, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { restaurant } from '../Model/restaurant';

@Injectable({
  providedIn: 'root'
})
export class RestaurantService implements OnInit {
  customerCity:string = ''
  constructor(private http:HttpClient) { }
  ngOnInit(): void { }

  fetchByCityURL:string = `http://localhost:8082/api/v3/restaurantsbycity/hyderabad`

  fetchRestaurantsByCity():Observable<Array<restaurant>> {
    return this.http.get<Array<restaurant>>(this.fetchByCityURL);
  }

  fetchRestaurantByid(resId:string):Observable<restaurant> {
    let fetchByIdURL = `http://localhost:8082/api/v3/restaurantsbyid/${resId}`;
    return this.http.get<restaurant>(fetchByIdURL); 
  }


}
