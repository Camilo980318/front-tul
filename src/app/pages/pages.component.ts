import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/product.service';
import { ProductCar } from '../models/ProductCar';

@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styleUrls: ['./pages.component.css']
})
export class PagesComponent implements OnInit {

  productsCar: ProductCar[] = [];

  constructor(private _productService: ProductService) { }

  ngOnInit() {
    this.getProductCar();
    console.log(this.productsCar)
  }

  // Obtenemos todos los productos creados por el admin
  getProductCar() {
    this._productService.getProductCar().subscribe((resp: any) => {
      this.productsCar = resp.productsCars;
    });
  }

}
