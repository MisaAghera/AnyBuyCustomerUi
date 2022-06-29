import { Injectable } from '@angular/core';
import { AddressModel } from '../models/address-model';  
import {HttpClient} from '@angular/common/http';
import { GlobalConstants } from '../global-constants.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AddressService {
  
    readonly getByIdUrl = GlobalConstants.apiURL+ 'Address/GetById/';
    readonly AddUrl = GlobalConstants.apiURL+ 'Address/Add';
    readonly updateUrl = GlobalConstants.apiURL + 'Address/Update/';
    readonly deleteUrl = GlobalConstants.apiURL+'Address/Delete/';
    readonly getAllByUserUrl = GlobalConstants.apiURL+'Address/GetAddressByUserId/';
    constructor(private http :HttpClient) { }
  
    // getAll() : Observable<Array<OrderModel>>{
    //   return this.http.get<Array<OrderModel>>(this.baseURLGet)
    // }
  
    getById(OrderId: number): Observable<AddressModel> {
      return this.http.get<AddressModel>(this.getByIdUrl+OrderId) 
    }
  
    delete(id:number){
      return this.http.delete(this.deleteUrl+id);
    }
    
    update(body :InModel){
      return this.http.put(this.updateUrl,body);
    }
  
    add(body : InModel): Observable<number>{
      return this.http.post<number>(this.AddUrl , body);
    }
  
    getAllByUserId(UserId: number): Observable<Array<AddressModel>> {
      return this.http.get<Array<AddressModel>>(this.getAllByUserUrl+UserId)  
    }
  }
  class InModel{
    In: AddressModel = new AddressModel();
  }
  