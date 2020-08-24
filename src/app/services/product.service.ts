import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Product } from '../models/Product';
import { URL_SERVICES } from 'src/config/config';

import { catchError, map } from 'rxjs/operators';
import { throwError } from 'rxjs'

import Swal from "sweetalert2"
import { ProductCar } from '../models/ProductCar';
import { Car } from '../models/Car';
import { User } from '../models/User';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  sku: String;

  constructor(private http: HttpClient, private router: Router) { }

  // Obtenemos el sku y lo asignamos a la variable global
  getSku(sku: String) {
    this.sku = sku;
  }


  // Obtenemos todos los productos
  getProductos() {
    let url = `${URL_SERVICES}/products`;
    return this.http.get(url);
  }

  getCar() {
    let url = `${URL_SERVICES}/car`;
    return this.http.get(url);
  }


  // Hacemos post de un producto
  guardarProducto(producto: Product) {
    let token = localStorage.getItem('token');
    let url = `${URL_SERVICES}/products?token=${token}`;

    return this.http.post(url, producto).pipe(map((resp: any) => {
      this.router.navigate(['/upload-image']);
      return true;

    }), catchError((err) => {
      Swal.fire({
        title: '¡Error!',
        text: err.error.message,
        icon: 'error',
      });
      return throwError(err);
    }))
  }

  // Post de una imagen de producto
  uploadImage(image: FormData) {
    let token = localStorage.getItem('token');
    let url = `${URL_SERVICES}/upload-image/${this.sku}?token=${token}`;

    return this.http.put(url, image).pipe(map((resp: any) => {
      Swal.fire({
        title: '¡Bien hecho!',
        icon: 'success',
        confirmButtonText: 'ok',
        showCancelButton: false,
        confirmButtonColor: '#60D89C',
        cancelButtonColor: '#d33'
      }).then((result) => {
        if (result) {
          this.router.navigate(['/dashboard']);
        }
      });
      return true;
    }), catchError((err) => {
      Swal.fire({
        title: '¡Error!',
        text: err.error.message,
        icon: 'error',
      });
      return throwError(err);
    }))
  }

  // Creamos un car
  addCart() {
    let url = `${URL_SERVICES}/car`;
    return this.http.post(url, null).pipe(map((resp: any) => {
      localStorage.setItem('carId', JSON.stringify(resp.carSaved._id))
      return true;
    }), catchError((err) => {

      Swal.fire({
        title: '¡Error!',
        text: err.error.message,
        icon: 'error',
      });
      return throwError(err);
    }))
  }

  // Creamos la lista de prductos del carrito
  postCarProduct(carProduct: ProductCar) {

    let url = `${URL_SERVICES}/products-car`;
    return this.http.post(url, carProduct).pipe(map((resp: any) => {
      Swal.fire({
        title: '¡Bien hecho!',
        icon: 'success',
        text: 'Producto Agregado al carrito',
        confirmButtonText: 'ok',
        showCancelButton: false,
        confirmButtonColor: '#60D89C',
      }).then((result) => {
        if (result) {
          location.reload();
        }
      });
      return true;
    }), catchError((err) => {
      Swal.fire({
        title: '¡Error!',
        text: err.error.message,
        icon: 'error',
      });
      return throwError(err);
    }))
  }


  // Obtenemos la lista de productos del carrito
  getProductCar() {
    let url = `${URL_SERVICES}/products-car`;
    return this.http.get(url);
  }

  // Obtenemos la lista de productos por carrito en específico
  getProductIdCar(idCar: string) {
    let url = `${URL_SERVICES}/products-car/${idCar}`;
    return this.http.get(url);
  }

  // Actualizamos la cantidad de productos
  updateProductCar(productCar: ProductCar, id: String) {
    let url = `${URL_SERVICES}/products-car/${id}`
    return this.http.put(url, productCar).pipe(map((resp: any) => {

      Swal.fire({
        title: '¡Bien hecho!',
        icon: 'success',
        confirmButtonText: 'Ok',
        showCancelButton: false,
        confirmButtonColor: '#60D89C',
        cancelButtonColor: '#d33'
      }).then((result) => {
        if (result) {
          location.reload();
        }
      });
      return true;

    }), catchError((err) => {
      Swal.fire({
        title: '¡Error!',
        text: err.error.message,
        icon: 'error',
      });
      return throwError(err);
    }))
  }


  // Eliminamos un elemento de la lista del carrito
  deleteProductCar(id: String) {
    let url = `${URL_SERVICES}/products-car/${id}`
    return this.http.delete(url).pipe(map((resp: any) => {
      Swal.fire({
        title: '¡Bien hecho!',
        icon: 'success',
        confirmButtonText: 'Ok',
        showCancelButton: false,
        confirmButtonColor: '#60D89C',
        cancelButtonColor: '#d33'

      }).then((result) => {
        if (result) {
          location.reload();
        }
      });
      return true;

    }), catchError((err) => {
      Swal.fire({
        title: '¡Error!',
        text: err.error.message,
        icon: 'error',
      });
      return throwError(err);
    }))
  }


  addUser(user: User) {
    let url = `${URL_SERVICES}/users`
    return this.http.post(url, user);
  }


  // Hacemos el checkout del carrito
  updateCart(id: string, car: Car) {

    let url = `${URL_SERVICES}/car/${id}`
    return this.http.put(url, car).pipe(map((resp: any) => {
      Swal.fire({
        title: '¡Bien hecho!',
        icon: 'success',
        confirmButtonText: 'Ok',

        showCancelButton: false,
        confirmButtonColor: '#60D89C',
        cancelButtonColor: '#d33'

      }).then((result) => {
        if (result) {
          localStorage.removeItem('carId');
          location.reload();
        }
      });
      return true;

    }), catchError((err) => {
      Swal.fire({
        title: '¡Error!',
        text: err.error.message,
        icon: 'error',
      });
      return throwError(err);
    }))

  }

}
