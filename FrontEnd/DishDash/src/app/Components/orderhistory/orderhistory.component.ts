import { Component, OnInit } from '@angular/core';
import { CartServiceService } from '../../services/cart-service.service';
import { OrderServiceService } from '../../services/order-service.service';
import { Order } from '../../Model/Order';
import { CookieService } from 'ngx-cookie-service';
import { customer } from '../../Model/customer';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-orderhistory',
  templateUrl: './orderhistory.component.html',
  styleUrl: './orderhistory.component.css'
})
export class OrderhistoryComponent implements OnInit {

  orderHistory:Order[] = [];
  orderIds:string[] = [];
  activeCustomer:customer;
  constructor(private orderService: OrderServiceService, private Cookieservice:CookieService, private userService:UserService) {}
  ngOnInit(): void {
    this.fetchActiveCustomer()
  
    
  }

  fetchActiveCustomer() {
    const Jwt = this.Cookieservice.get('token')
    this.userService.fetchCustomerByJwt(Jwt).subscribe({
      next:data => {
        this.activeCustomer  = data;
        this.fetchCustomerOrderIds()
      },
      error:data => {
        console.log("Error while fetching customer")
      }
    })

  }

  fetchCustomerOrderIds() {
    this.orderIds = this.activeCustomer.customerOrderHistory; 
    this.fetchingAllOrderHistory();
  }

  fetchingAllOrderHistory() {
    for ( let orderId of this.orderIds) {
      this.orderService.fetchingOneOrder(orderId).subscribe({
        next:data => {
          console.log("Fetch Success");
          this.orderHistory.push(data);
        },
        error:e => {
          console.log("Error while fetching Order History")
        }
      })
    }
  }
  

}
