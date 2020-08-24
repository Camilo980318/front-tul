import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PagesComponent } from './pages.component';
import { LoginComponent } from './login/login.component';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ProductsComponent } from './products/products.component';
import { PAGES_ROUTES } from './pages.routes';
import { ServicesModule } from '../services/services.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AddProductComponent } from './add-product/add-product.component';
import { UploadImageComponent } from './upload-image/upload-image.component';
import { CarComponent } from './car/car.component';
import { NgxPrintModule } from 'ngx-print';



@NgModule({
  declarations: [PagesComponent, LoginComponent, ProductsComponent, DashboardComponent, AddProductComponent, UploadImageComponent, CarComponent],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    PAGES_ROUTES,
    ServicesModule,
    NgxPrintModule
  ],
  providers: [PagesComponent, LoginComponent, DashboardComponent, AddProductComponent]
})
export class PagesModule { }
