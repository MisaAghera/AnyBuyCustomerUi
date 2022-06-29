import { Component, OnInit } from '@angular/core';
import { CartModel } from '../shared/models/cart-model.model';
import { CartService } from '../shared/services/cart.service';
import { OrderDetailsModel } from '../shared/models/order-details-model';
import { OrderDetailsService } from '../shared/services/order-details.service';
import { OrderModel } from '../shared/models/order-model';
import { OrderService } from '../shared/services/order.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  cartProducts: CartModel[] = [];
  OrderDetailsList: OrderDetailsModel[] = [];
  orderId: number = 0;

  constructor(public CartService: CartService,
    public OrderDetailsService: OrderDetailsService,
    public OrderService: OrderService,
    public router:Router) { }

  userId: number = Number(localStorage.getItem('userId')) ? Number(localStorage.getItem('userId')) : 0;
  cartList?: CartModel[];

  async createOrder() {
    var order: InOrderModel = new InOrderModel();
    order.In.userId = Number(localStorage.getItem("userId"));
    this.OrderService.add(order).subscribe(async res => {
      this.orderId = res;
      await this.addOrderDetailsToOrder(this.orderId);
      this.router.navigate(['/order/'+this.orderId]);
    });
  }

  async getAllCartProducts() {
    await this.CartService.getAllByUserId(this.userId).subscribe(async res => {
      this.cartList = res;
    })
  }

  addItem(newItem: CartModel) {
    this.cartProducts.push(newItem);
  }

  async onCheckout() {
    let orderId = this.createOrder();
  }

  async addOrderDetailsToOrder(orderId: number) {
    for (let cartItem of this.cartList!) {
      var orderDetails: InOrderDetailsModel = new InOrderDetailsModel();
      orderDetails.In.orderId = orderId;
      orderDetails.In.productId = cartItem.productId;
      orderDetails.In.status = 'preparing';
      orderDetails.In.quantity = cartItem.quantity;

      this.OrderDetailsService.add(orderDetails).subscribe({
        next: (_) => {
          console.log("added success")
        },
        error: (err: HttpErrorResponse) => {
          console.log("error")
        }
      });
    }
  }

  async ngOnInit(): Promise<void> {
    await this.getAllCartProducts();
  }
}

class InOrderModel {
  In: OrderModel = new OrderModel();
}

class InOrderDetailsModel {
  In: OrderDetailsModel = new OrderDetailsModel();
}