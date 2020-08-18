import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { LoginService } from '../../services/login.service';
import { Admin } from '../../models/Admin';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private _loginService: LoginService) { }

  ngOnInit() {

    // Eliminamos los datos de usuario
    localStorage.removeItem('token');
    localStorage.removeItem('admin');
  }

  // Hacemos el login de usuario
  ingresar(form: NgForm) {
    let admin = new Admin(null, null, form.value.email, form.value.password);
    this._loginService.ingresar(admin).subscribe();
  }

}
