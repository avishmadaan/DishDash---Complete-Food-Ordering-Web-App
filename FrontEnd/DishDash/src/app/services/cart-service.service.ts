import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Cart } from '../Model/Cart';
import { Observable } from 'rxjs';
import { CartDish } from '../Model/CartDish';

@Injectable({
  providedIn: 'root'
})
export class CartServiceService {

  constructor(private http:HttpClient, private cookieService:CookieService) { }

  //Adding a Cart Item To Cart Of Customer
  addingCartItem(restId:string, cartId:string, cartItem:CartDish):Observable<Cart> {

    return this.http.put<Cart>(`http://localhost:8089/api/v4/cart/update/${restId}/${cartId}`,cartItem);
  }

    //Removing a Cart Item from the Cart
    removingCartItem(cartId:string, dishName:string):Observable<Cart> {

      const params = new HttpParams()
      .set('cartId', cartId)
      .set('dishName', dishName );

      return this.http.put<Cart>("http://localhost:8089/api/v4/cart/removeDish",null,  { params });
    }

    //Fetching a whole Cart from Cart Compoenent

    fetchingWholeCart(cartId:string):Observable<Cart> {

      return this.http.get<Cart>(`http://localhost:8089/api/v4/cart/cartById/${cartId}`)


    }



}



