import { Component, Input, OnInit } from '@angular/core';
import { ProductService } from '../shared/services/products.service'; 
import { ProductModel } from '../shared/models/product-model.model'; 
import { DiscountsService } from '../shared/services/discounts.service';
import { DiscountModel } from '../shared/models/discount-model.model';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css']
})
export class ProductCardComponent implements OnInit {
  DiscountDetails: DiscountModel = new DiscountModel();

  @Input() Product? :ProductModel;

  async getDiscountFunction(DiscountId:number|undefined) {
    await this.DiscountsService.GetById(DiscountId!).subscribe(
      res => {
        this.DiscountDetails = res;
      }
    );
  }

  constructor(public service:ProductService, public DiscountsService:DiscountsService) { }
  
  ngOnInit(): void {
    this.Product;
    this.getDiscountFunction(this.Product!.discountId);
  }
 
}


