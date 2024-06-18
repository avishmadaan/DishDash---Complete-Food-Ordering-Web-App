import { Component, OnInit } from "@angular/core";
import { OrderServiceService } from "../../services/order-service.service";
import { UserService } from "../../services/user.service";
import { Order } from "../../Model/Order";
import { customer } from "../../Model/customer";

@Component({
  selector: 'app-admin-view',
  templateUrl: './admin-view.component.html',
  styleUrls: ['./admin-view.component.css']
})

export class AdminViewComponent implements OnInit {

  allOrders: Order[] = [];
  allCustomers: customer[] = [];
  
  orderDisplayedColumns: string[] = ['orderId', 'customerId', 'totalPrice', 'paymentMethod', 'timeStamp'];
  customerDisplayedColumns: string[] = ['customerId', 'customerName', 'customerEmail', 'customerPhone'];

  constructor(private orderService: OrderServiceService, private userService: UserService) {}

  ngOnInit(): void {
    this.fetchingAllOrders();
    this.fetchingAllCustomers();
  }

  fetchingAllOrders() {
    this.orderService.fetchingAllOrders().subscribe({
      next: data => {
        this.allOrders = data;
        console.log("Success while fetching All Orders");
      },
      error: data => {
        console.log("Error while fetching all orders");
      }
    });
  }

  fetchingAllCustomers() {
    this.userService.fetchAllCustomers().subscribe({
      next: data => {
        this.allCustomers = data;
        console.log("Success while fetching All Customers");
      },
      error: data => {
        console.log("Error while fetching all customers");
      }
    });
  }

}
