import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { Product } from 'src/app/models/Product';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor(private _productService: ProductService) { }

  products: Product[] = [];

  ngOnInit() {

    this.getProducts()

  }

  // Obtenemos los productos que el admin ha publicado
  getProducts() {
    this._productService.getProductos().subscribe((resp: any) => {
      this.products = resp.products;
    });
  }
}
