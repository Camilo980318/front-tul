import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginService } from './login.service';
import { ProductService } from './product.service';
import { ImagePipe } from './image.pipe';



@NgModule({
  declarations: [ImagePipe],
  imports: [
    CommonModule
  ],
  providers: [LoginService, ProductService],
  exports: [ImagePipe]
})
export class ServicesModule { }
