import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { CartModel } from '../shared/models/cart-model.model';
import { ProductModel } from '../shared/models/product-model.model';
import { CartService } from '../shared/services/cart.service';
@Component({
  selector: 'app-cart-card',
  templateUrl: './cart-card.component.html',
  styleUrls: ['./cart-card.component.css']
})
export class CartCardComponent implements OnInit {
  @Input() product :CartModel = new CartModel();
  @Output() newItemEvent = new EventEmitter<CartModel>();

  totalPrice:Number = Number(this.product.quantity) * Number(this.product.productPrice);
  constructor(public CartService:CartService,public router:Router) { }

  deleteCartItem(cartProductId:number){
    this.CartService.delete(cartProductId).subscribe(res=>{
      window.location.reload();
    });
  }

  sendCartItemToParent(value: CartModel) {
    this.newItemEvent.emit(value);
  }

  onAddToOrder(product:CartModel){

  }

  ngOnInit(): void {
 this.product;
  }

}
