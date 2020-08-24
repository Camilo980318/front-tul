import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { ProductCar } from '../../models/ProductCar';
import { NgForm } from '@angular/forms';
import Swal from 'sweetalert2';
import { User } from '../../models/User';
import { Car } from '../../models/Car';

@Component({
  selector: 'app-car',
  templateUrl: './car.component.html',
  styleUrls: ['./car.component.css']
})
export class CarComponent implements OnInit {

  productCar: ProductCar[] = [];
  carId: string;
  total: number;

  constructor(private _productService: ProductService) { }

  ngOnInit() {
    this.getProductCar();
    this.carId = JSON.parse(localStorage.getItem('carId'));
    console.log(this.productCar.length)
  }

  // Obtenemos todos los productos del carrito
  getProductCar() {

    let idCar = JSON.parse(localStorage.getItem('carId'));

    this._productService.getProductIdCar(idCar).subscribe((resp: any) => {
      this.productCar = resp.productsCars;

      if (localStorage.getItem('carId')) {

        let total = 0;
        for (let item of resp.productsCars) {
          total += item.subtotal;
        }
        this.total = total;

      } else {
        this.total = 0;
      }
    });
  }

  // Actualizamos la cantidad de producto
  updateQuantity(form: NgForm, id: String, price: number) {
    Swal.fire({
      title: '¿Deseas Actualizarlo?',
      icon: 'warning',
      cancelButtonText: 'No estoy seguro',
      confirmButtonText: 'Si, continuar!',

      showCancelButton: true,
      confirmButtonColor: '#60D89C',
      cancelButtonColor: '#d33'

    }).then((result) => {

      let subtotal = form.value.quantity * price;
      let productCar = new ProductCar(null, null, form.value.quantity, subtotal);
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
  checkout(form: NgForm) {
    let carId = JSON.parse(localStorage.getItem('carId'));
    Swal.fire({
      title: '¿Hacer Pago?',
      icon: 'warning',
      cancelButtonText: 'No estoy seguro',
      confirmButtonText: 'Si, eso quiero!',

      showCancelButton: true,
      confirmButtonColor: '#60D89C',
      cancelButtonColor: '#d33'

    }).then((result) => {

      let idUser;

      let user = new User(form.value.name, form.value.phone, form.value.email);
      this._productService.addUser(user).subscribe((resp: any) => {
        idUser = resp.id;
      });

      setTimeout(() => {
        let uptCar = new Car(idUser, this.total);
        this._productService.updateCart(carId, uptCar).subscribe();
        this.total = 0;
      }, 300);
    });
  }
}
