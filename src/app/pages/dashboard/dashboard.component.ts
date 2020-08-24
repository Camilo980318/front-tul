import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { Product } from 'src/app/models/Product';
import { Car } from '../../models/Car';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor(private _productService: ProductService) { }

  products: Product[] = [];
  ventas: any[] = [];
  productsVenta: any[];

  idCar: string;
  userName: string;
  userEmail: string;
  userPhone: string;
  total: number;
  fecha_pago: string;

  ngOnInit() {

    this.getProducts();
    this.getVentas();
  }

  // Obtenemos los productos que el admin ha publicado
  getProducts() {
    this._productService.getProductos().subscribe((resp: any) => {
      this.products = resp.products;
    });
  }

  getVentas() {
    this._productService.getCar().subscribe((resp: any) => {
      this.ventas = resp.cars;
    })
  }

  getVentasProducts(id: string, venta: any) {

    this.idCar = venta._id;
    this.userName = venta.user.name;
    this.userEmail = venta.user.email;
    this.userPhone = venta.user.phone;
    this.total = venta.total;
    this.fecha_pago = venta.fecha_pago;

    this._productService.getProductIdCar(id).subscribe((resp: any) => {
      this.productsVenta = resp.productsCars;
    })
  }

  imprimir() {
    const printContent = document.getElementById("infoPrint");
    const WindowPrt = window.open('', '', 'left=0,top=0,width=900,height=900,toolbar=0,scrollbars=0,status=0');
    WindowPrt.document.write(printContent.innerHTML);
    WindowPrt.document.close();
    WindowPrt.focus();
    WindowPrt.print();
    WindowPrt.close();
  }
}
