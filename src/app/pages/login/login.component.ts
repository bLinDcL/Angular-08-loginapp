import { Component, OnInit } from '@angular/core';
import { UsuarioModel } from '../../models/usuario.model';
import { NgForm } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  usuario: UsuarioModel = new UsuarioModel();
  recordar = false;

  constructor( private authService: AuthService, private router: Router ) {}

  ngOnInit() {
    if ( localStorage.getItem('email') ) {
      this.usuario.email = localStorage.getItem('email');
      this.recordar = true;
    }
  }

  login( form: NgForm) {
    Swal.fire({
      allowOutsideClick: false,
      type: "info",
      text: "Espere por favor"
    });
    Swal.showLoading();

    if ( form.invalid ) {
      Swal.close();
      return;
    }
    this.authService.logIn( this.usuario ).subscribe( data => {
      console.log(data);
      Swal.close();

      if ( this.recordar ) {
        localStorage.setItem( 'email', this.usuario.email );
      }

      this.router.navigateByUrl('/home');
    }, (err) => {
      console.log(err.error.error.message);
      Swal.fire({
        type: "error",
        title: "Error al autenticar",
        text: err.error.error.message
      });
    })
  }

}
