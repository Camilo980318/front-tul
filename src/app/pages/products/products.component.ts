import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { Product } from 'src/app/models/Product';
import { NgForm } from '@angular/forms';
import { ProductCar } from '../../models/ProductCar';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  constructor(private _productService: ProductService) { }

  products: Product[];

  ngOnInit(): void {
    this.getProducts()
  }

  // Obtenemos todos los productos
  getProducts() {
    this._productService.getProductos().subscribe((resp: any) => {
      this.products = resp.products;
    })
  }

  // Agregamos productos al carrito
  addToCar(form: NgForm, id: string, price: number) {

    // Si no existe el carrito, se crea y luego se agregan los productos 
    if (!JSON.parse(localStorage.getItem('carId'))) {
      this._productService.addCart().subscribe();

      setTimeout(() => {

        let idCar = JSON.parse(localStorage.getItem('carId'));

        let subtotal = form.value.quantity * price;
        let productCar = new ProductCar(idCar, id, form.value.quantity, subtotal);
        this._productService.postCarProduct(productCar).subscribe();

      }, 300);

    } else {

      // Pero si existe, se obtiene el id del carrito y se asocian los productos con este
      let idCar = JSON.parse(localStorage.getItem('carId'));
      let subtotal = form.value.quantity * price;
      let productCar = new ProductCar(idCar, id, form.value.quantity, subtotal);
      this._productService.postCarProduct(productCar).subscribe();


    }
  }
}
