import { Injectable } from '@angular/core';
import { Admin } from '../models/Admin';
import { URL_SERVICES } from 'src/config/config';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { catchError, map } from 'rxjs/operators';
import { throwError } from 'rxjs'

import Swal from "sweetalert2"

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient, private router: Router) { }

  // Hacemos el login
  ingresar(admin: Admin) {

    let url = `${URL_SERVICES}/login`;
    return this.http.post(url, admin).pipe(map((resp: any) => {

      localStorage.setItem('admin', JSON.stringify(resp.admin));
      localStorage.setItem('token', resp.token);

      this.router.navigate(['/dashboard']);

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

