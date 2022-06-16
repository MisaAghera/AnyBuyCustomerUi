import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../shared/services/products.service';
import { ProductModel } from '../shared/models/product-model.model';
@Component({
  selector: 'app-productsingle',
  templateUrl: './productsingle.component.html',
  styleUrls: ['./productsingle.component.css']
})
export class ProductsingleComponent implements OnInit {
  ProductDetails: ProductModel = new ProductModel();

  constructor(public route: ActivatedRoute, public ProductService: ProductService) { }

  getById(id: number): void {
    this.ProductService.getById(id).subscribe(result => {
      this.ProductDetails = result;
    });
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      var id = Number(params.get('id'));
      this.getById(id);
      debugger
    });
  }

}
