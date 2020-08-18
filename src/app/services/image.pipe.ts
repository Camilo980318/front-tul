import { Pipe, PipeTransform } from '@angular/core';
import { URL_SERVICES } from 'src/config/config';

@Pipe({
  name: 'image'
})
export class ImagePipe implements PipeTransform {

  // Cargamos las imágenes de los productos
  transform(img: string, referencia: string) {

    let url = `${URL_SERVICES}/send-image/${referencia}/`;

    if (!img) {
      return url += "notfound";

    } else {
      return url += img;
    }

  }

}
