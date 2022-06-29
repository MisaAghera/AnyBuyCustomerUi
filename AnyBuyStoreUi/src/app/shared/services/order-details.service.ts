import { Injectable } from '@angular/core';
import { OrderDetailsModel } from '../models/order-details-model';
import { OrderModel } from '../models/order-model'; 
import {HttpClient} from '@angular/common/http';
import { GlobalConstants } from '../global-constants.model';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class OrderDetailsService {
  formData: OrderModel = new OrderModel();

  readonly getByIdUrl = GlobalConstants.apiURL+ 'OrderDetails/GetById/';
  readonly AddUrl = GlobalConstants.apiURL+ 'OrderDetails/Add';
  readonly updateUrl = GlobalConstants.apiURL + 'OrderDetails/Update/';
  readonly deleteUrl = GlobalConstants.apiURL+'OrderDetails/Delete/';
  readonly getAllByOrderUrl = GlobalConstants.apiURL+'OrderDetails/GetAllByOrderId?OrderId=';
  constructor(private http :HttpClient) { }

  // getAll() : Observable<Array<OrderModel>>{
  //   return this.http.get<Array<OrderModel>>(this.baseURLGet)
  // }
  
  getById(OrderId: number): Observable<OrderModel> {
    return this.http.get<OrderModel>(this.getByIdUrl+OrderId) 
  }

  delete(id:number){
    return this.http.delete(this.deleteUrl+id);
  }
  
  update(body :InModelOrderDetails){
    return this.http.put(this.updateUrl,body);
  }

  add(body : InModelOrderDetails){
    return this.http.post(this.AddUrl , body);
  }

  getByOrderId(orderId: number): Observable<Array<OrderDetailsModel>> {
    return this.http.get<Array<OrderDetailsModel>>(this.getAllByOrderUrl+orderId)  
  }
}
class InModelOrderDetails{
  In: OrderDetailsModel = new OrderDetailsModel();
}
