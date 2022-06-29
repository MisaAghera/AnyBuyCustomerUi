import { Component, OnInit } from '@angular/core';
import { OrderModel } from '../shared/models/order-model';
import { OrderService } from '../shared/services/order.service';
import { OrderDetailsModel } from '../shared/models/order-details-model';
import { OrderDetailsService } from '../shared/services/order-details.service';
import { ActivatedRoute, Route } from '@angular/router';
@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {
  orderList?: OrderDetailsModel[];
  id:number=0;
  totalPrice?: number;
  constructor(public OrderService:OrderService,
    public OrderDetailsService:OrderDetailsService,
    public route : ActivatedRoute) { }

  getProducts(orderId:number): void {
    this.OrderDetailsService.getByOrderId(orderId).subscribe(async result => {
      this.orderList = result ;
      this.totalPrice =result.reduce((accumulator, object) => {
        return accumulator + (object.price!*object.quantity!);
      }, 0);
    });
  }

  deleteOrderitem(id:number){
  this.OrderDetailsService.delete(id).subscribe(res=>{
    this.getProducts(this.id);
  });
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(async params => {
      var id = Number(params.get('id'));
      this.id = id;
      await this.getProducts(id);
    });
  }

}
