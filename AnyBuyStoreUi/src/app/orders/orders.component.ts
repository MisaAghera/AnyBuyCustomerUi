import { Component, OnInit } from '@angular/core';
import { OrderModel } from '../shared/models/order-model';
import { OrderService } from '../shared/services/order.service';
import { OrderDetailsModel } from '../shared/models/order-details-model';
import { OrderDetailsService } from '../shared/services/order-details.service';
import { ActivatedRoute, Route } from '@angular/router';
import { CartService } from '../shared/services/cart.service';
import { ProductService } from '../shared/services/products.service';
import { ProductQuantity } from '../shared/models/product-quantity';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {
  orderList?: OrderDetailsModel[];
  id: number = 0;
  totalPrice?: number;
  constructor(public OrderService: OrderService,
    public OrderDetailsService: OrderDetailsService,
    public route: ActivatedRoute,
    public CartService:CartService,
    public ProductService:ProductService) { }

  getProducts(orderId: number): void {
    this.OrderDetailsService.getAllByOrderId(orderId).subscribe(async result => {
      this.orderList = result;
      this.totalPrice = result.reduce((accumulator, object) => {
        return accumulator + (object.price! * object.quantity!);
      }, 0);
    });
  }

  deleteOrderitem(id: number) {
    this.OrderDetailsService.delete(id).subscribe(res => {
      this.getProducts(this.id);
    });
  }

  onClickConfirm() {
    this.OrderService.getById(this.id).subscribe(res => {
      let order = new InOrderModel();
      order.In.addressId = res.addressId;
      order.In.id = res.id;
      order.In.totalAmount = this.totalPrice;
      order.In.userId = res.userId;
      this.OrderService.update(order).subscribe(async res => {
      });
      var userId = Number(localStorage.getItem('userId'));
      this.CartService.deleteFromUserId(userId).subscribe();
      this.OrderDetailsService.getAllByOrderId(this.id).subscribe(res=>{
        for(let orderDetail of res){
          let orederQuantity = orderDetail.quantity;
          console.log(orederQuantity);
          this.ProductService.getById(orderDetail.productId).subscribe(res=>{
            var updateModel:InUpdateProductmodel= new InUpdateProductmodel();
             updateModel.In.id = res.id;
             updateModel.In.quantity = res.quantity-orederQuantity;
             this.ProductService.updateQuantity(updateModel).subscribe();
          })
        }
      })
    })
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(async params => {
      var id = Number(params.get('id'));
      this.id = id;
      await this.getProducts(id);
    });
  }

}


class InOrderModel {
  In: OrderModel = new OrderModel();
}

class InUpdateProductmodel{
  In:ProductQuantity=new ProductQuantity();
}