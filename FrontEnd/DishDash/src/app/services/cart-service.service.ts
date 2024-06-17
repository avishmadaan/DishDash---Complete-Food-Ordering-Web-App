import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Cart } from '../Model/Cart';
import { Observable } from 'rxjs';
import { CartDish } from '../Model/CartDish';
import { Order } from '../Model/Order';

@Injectable({
  providedIn: 'root'
})
export class CartServiceService {

  constructor(private http:HttpClient, private cookieService:CookieService) { }


  


}



