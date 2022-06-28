import { Injectable } from '@angular/core';
import { CartModel } from '../models/cart-model.model';
import {HttpClient} from '@angular/common/http';
import { GlobalConstants } from '../global-constants.model';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})

export class CartService {
  readonly getCartUrl = GlobalConstants.apiURL+'ProductCart/GetAll?UserId=';
  readonly addCartUrl = GlobalConstants.apiURL+'ProductCart/Add';
  readonly deleteCartUrl = GlobalConstants.apiURL+'ProductCart/Delete/';
  readonly updateCartUrl = GlobalConstants.apiURL+'ProductCart/Update/1';

  getAllByUserId(userId:number) : Observable<Array<CartModel>>{
    return this.http.get<Array<CartModel>>(this.getCartUrl+userId)
  }
  
  add(body : InModelCart){
    return this.http.post(this.addCartUrl , body);
  }

  delete(id:number){
    return this.http.delete(this.deleteCartUrl+id);
  }

  update(body :InModelCart){
    return this.http.put(this.updateCartUrl,body);
  }

  constructor(private http :HttpClient) { }
}

class InModelCart{
  In: CartModel = new CartModel();
}
