import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { customerLogin } from '../Model/customerLogin';
import { Observable, Subject } from 'rxjs';
import { customer } from '../Model/customer';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  loginAPIkey:string = ``;

  logInSubject = new Subject<boolean>()

  constructor(private http:HttpClient) { }

  loginUser(data:customerLogin):Observable<string> {
    return this.http.post("http://localhost:8081/api/v1/login", data,  { responseType: 'text' });
  }

  fetchCustomerByJwt(Jwt:any):Observable<customer> {

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${Jwt}` 
    });
    console.log(headers);

    return this.http.get<customer>('http://localhost:8083/api/v2/customers/eachcustomer',{ headers });
  }

  fetchCustomerFavRestaurants(customerId:string):Observable<string> {
    return this.http.get<string>("url")
  }

  login(isLoggedIn:boolean) {
    this.logInSubject.next(isLoggedIn);
  }


}
