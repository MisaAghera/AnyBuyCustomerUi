import { Component, OnInit } from '@angular/core';
import { CartModel } from '../shared/models/cart-model.model';
import { CartService } from '../shared/services/cart.service';
@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  cartProducts : CartModel[] =[];

  constructor(public CartService:CartService) { }
  userId:number = Number(localStorage.getItem('userId')) ? Number(localStorage.getItem('userId')): 0;
  cartList?:CartModel[];

  getAllCartProducts(){
    this.CartService.getAllByUserId(this.userId).subscribe(res=>{
    this.cartList = res;
    })
  }

  addItem(newItem: CartModel) {
    this.cartProducts.push(newItem);
  }
  
  onCheckout(){
    console.log(this.cartProducts);

  }
  ngOnInit(): void {
    this.getAllCartProducts();
  }
}
