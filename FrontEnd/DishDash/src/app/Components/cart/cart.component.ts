import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CartServiceService } from '../../services/cart-service.service';
import { Cart } from '../../Model/Cart';
import { CartDish } from '../../Model/CartDish';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent implements OnInit {

  customerCart:Cart={
    cartId: '',
    resId: '',
    dishList: []
  }

  quantityOfDishItems:number;


  @Input()
  cartId:string
  @Output()
 quantityChange:EventEmitter<number> = new EventEmitter<number>()



  constructor(private cartService:CartServiceService) {}

  ngOnInit(): void {
    console.log("My cartId :"+this.cartId)
    this.fetchingWholeCart()

  }

  fetchingWholeCart() {
    this.cartService.fetchingWholeCart(this.cartId).subscribe({
      next:data => {
        this.customerCart = data;
        this.quantityOfDishItems = data.dishList.length;
        console.log("Success in fetching whole cart");
        
        console.log(data)

        this.quantityChange.emit(this.quantityOfDishItems);
      },
      error:e => {
        console.log("Error while fetching cart")
      }
    })

  }
  

}
