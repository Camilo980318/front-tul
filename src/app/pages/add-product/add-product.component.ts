import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ProductService } from '../../services/product.service';
import { Product } from '../../models/Product';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent implements OnInit {

  constructor(private _productService: ProductService) { }

  ngOnInit(): void {
  }


  // Post de un producto
  guardar(form: NgForm) {

    Swal.fire({
      title: '¿Deseas Continuar?',
      icon: 'warning',
      cancelButtonText: 'No estoy seguro',
      confirmButtonText: 'Si, continuar!',

      showCancelButton: true,
      confirmButtonColor: '#60D89C',
      cancelButtonColor: '#d33'

    }).then((result) => {

      if (result.value) {

        let producto = new Product(form.value.name, form.value.sku, form.value.description);

        this._productService.getSku(form.value.sku);
        this._productService.guardarProducto(producto).subscribe();

      }

    });

  }
}
