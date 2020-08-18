import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-upload-image',
  templateUrl: './upload-image.component.html',
  styleUrls: ['./upload-image.component.css']
})
export class UploadImageComponent implements OnInit {

  constructor(private _productService: ProductService) { }

  image = new FormData();
  nombreArchivo: string;

  ngOnInit(): void {
  }

  // Obtenemos la imagen del input y asignamos el nobre y contenido a las variables globales
  getImagen(file: File) {
    this.nombreArchivo = file.name;
    let image = <File>file;
    this.image.append('image', image, image.name)
  }


  // Enviamos la imagen al servidor
  subirImagen() {

    Swal.fire({
      title: '¿Guardar Producto?',
      icon: 'warning',
      cancelButtonText: 'No estoy seguro',
      confirmButtonText: 'Si, guardar!',

      showCancelButton: true,
      confirmButtonColor: '#60D89C',
      cancelButtonColor: '#d33'

    }).then((result) => {

      if (result.value) {

        console.log(this.image)
        this._productService.uploadImage(this.image).subscribe();
      }
    });
  }
}
