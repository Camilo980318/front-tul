import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { ProductCar } from '../../models/ProductCar';
import { NgForm } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-car',
  templateUrl: './car.component.html',
  styleUrls: ['./car.component.css']
})
export class CarComponent implements OnInit {

  productCar: ProductCar[] = [];
  carId: string;

  constructor(private _productService: ProductService) { }

  ngOnInit() {
    this.getProductCar();
    this.carId = JSON.parse(localStorage.getItem('carId'));
  }

  // Obtenemos todos los productos del carrito
  getProductCar() {
    this._productService.getProductCar().subscribe((resp: any) => {
      this.productCar = resp.productsCars;
    });
  }

  // Actualizamos la cantidad de producto
  updateQuantity(form: NgForm, id: String) {
    Swal.fire({
      title: '¿Deseas Actualizarlo?',
      icon: 'warning',
      cancelButtonText: 'No estoy seguro',
      confirmButtonText: 'Si, continuar!',

      showCancelButton: true,
      confirmButtonColor: '#60D89C',
      cancelButtonColor: '#d33'

    }).then((result) => {

      let productCar = new ProductCar(null, null, form.value.quantity);
      this._productService.updateProductCar(productCar, id).subscribe();
    });
  }


  // Eliminamos un producto del carrito
  deleteProductCart(id: String) {
    Swal.fire({
      title: '¿Deseas Quitaarlo?',
      icon: 'warning',
      cancelButtonText: 'No estoy seguro',
      confirmButtonText: 'Si, eso quiero!',

      showCancelButton: true,
      confirmButtonColor: '#60D89C',
      cancelButtonColor: '#d33'

    }).then((result) => {
      this._productService.deleteProductCar(id).subscribe();
    });

  }


  // Hacemos checkout
  checkout() {
    let carId = JSON.parse(localStorage.getItem('carId'));
    Swal.fire({
      title: '¿Hacer Check-out?',
      icon: 'warning',
      cancelButtonText: 'No estoy seguro',
      confirmButtonText: 'Si, eso quiero!',

      showCancelButton: true,
      confirmButtonColor: '#60D89C',
      cancelButtonColor: '#d33'

    }).then((result) => {
      this._productService.updateCart(carId).subscribe();
    });

  }
}
