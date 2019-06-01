import { Component } from '@angular/core';
import { UsuarioModel } from '../../models/usuario.model';
import { NgForm } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent {

  usuario: UsuarioModel = new UsuarioModel();
  recordar = false;

  constructor( private authService: AuthService, private router: Router ) {}

  onSubmit( form: NgForm ) {
    Swal.fire({
      allowOutsideClick: false,
      type: "info",
      text: "Espere por favor"
    });
    Swal.showLoading();

    if ( form.invalid ){
      Swal.close();
      return;
    }

    this.authService.nuevoUsuario( this.usuario ).subscribe( data => {
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
        title: "Error al crear usuario",
        text: err.error.error.message
      });
    });
  }

}
