import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  constructor(private http:HttpClient) { }
  url:string = "http://localhost:8083/api/v2/register";
  addUser(customer:any):Observable<any>
  {
    return this.http.post<any>(this.url,customer);
  }
}
