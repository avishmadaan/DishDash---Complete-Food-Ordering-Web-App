import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { customerLogin } from '../Model/customerLogin';
import { Observable } from 'rxjs';
import { customer } from '../Model/customer';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  loginAPIkey:string = ``;

  constructor(private http:HttpClient) { }

  loginUser(data:customerLogin):Observable<string> {
    return this.http.post("http://localhost:8081/api/v1/login", data,  { responseType: 'text' });
  }

  fetchCustomerById(id:string):Observable<customer> {

    return this.http.get<customer>("http://localhost:8082/api/v1/login")
  }

  fetchCustomerFavRestaurants(customerId:string):Observable<string> {
    return this.http.get<string>("url")
  }

  
}
