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
  addressId :number=0;

  constructor(public CartService: CartService,
    public OrderDetailsService: OrderDetailsService,
    public OrderService: OrderService,
    public router:Router) { }

  userId: number = Number(localStorage.getItem('userId')) ? Number(localStorage.getItem('userId')) : 0;
  cartList?: CartModel[];

  async getAddressIdFromChild(addressId:number){
     this.addressId = addressId;
  }

  async createOrder() {
    var order: InOrderModel = new InOrderModel();
    order.In.userId = Number(localStorage.getItem("userId"));
    order.In.addressId = this.addressId;
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

  async onClickOrderPlace() {
      let orderId = this.createOrder();
    
  }

  async onClickDisplayAddressPanel(){
    if(this.cartList?.length!=0){
    document.getElementById("editAddressPanel")!.style.display = "block";
    for (let cartItem of this.cartList!) {
      var cartDetails: InCartModel = new InCartModel();
      cartDetails.In.id = cartItem.id;
      cartDetails.In.quantity = cartItem.quantity;
      cartDetails.In.userId = Number(localStorage.getItem('userId'));
      cartDetails.In.productId = cartItem.productId;
      cartDetails.In.isAvailable=true;
      this.CartService.update(cartDetails).subscribe({
        next: (_) => {
          console.log("updated success");
        },
        error: (err: HttpErrorResponse) => {
          console.log("error")
        }
      });
    }
  }
  }

  async addOrderDetailsToOrder(orderId: number) {
    for (let cartItem of this.cartList!) {
      var orderDetails: InOrderDetailsModel = new InOrderDetailsModel();
      orderDetails.In.orderId = orderId;
      orderDetails.In.productId = cartItem.productId;
      orderDetails.In.status = 'preparing';
      orderDetails.In.quantity = cartItem.quantity;
      this.OrderDetailsService.add(orderDetails).subscribe({
        next: (res) => {
          console.log("added success");
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

class InCartModel{
  In:CartModel = new CartModel();
}