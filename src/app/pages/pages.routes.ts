import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { PagesComponent } from './pages.component';
import { ProductsComponent } from './products/products.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LoginGuard } from '../guards/login.guard';
import { AddProductComponent } from './add-product/add-product.component';
import { UploadImageComponent } from './upload-image/upload-image.component';
import { CarComponent } from './car/car.component';


const pagesRoutes: Routes = [

    { path: 'admin-login', component: LoginComponent },
    { path: 'dashboard', component: DashboardComponent, canActivate: [LoginGuard] },
    { path: 'add-product', component: AddProductComponent, canActivate: [LoginGuard] },
    { path: 'upload-image', component: UploadImageComponent, canActivate: [LoginGuard] },

    {
        path: '', component: PagesComponent, children: [
            { path: 'products', component: ProductsComponent },
            { path: 'car', component: CarComponent }
        ]
    }
];

export const PAGES_ROUTES = RouterModule.forRoot(pagesRoutes, { useHash: true });