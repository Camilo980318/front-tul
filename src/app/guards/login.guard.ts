import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginGuard implements CanActivate {

  constructor(private router: Router) { }

  // protección de rutas del admin
  canActivate() {
    if (localStorage.getItem('token')) {
      return true;
    } else {
      this.router.navigate(['/admin-login']);
      return false;
    }
  }

}
