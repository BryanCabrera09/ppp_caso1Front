import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Usuario } from 'src/app/core/models/usuario';
import { RegisterUserService } from 'src/app/core/services/register-user.service';

@Component({
  selector: 'app-reg-user',
  templateUrl: './reg-user.component.html',
  styleUrls: ['./reg-user.component.css']
})
export class RegUserComponent implements OnInit {

  usuario: Usuario = new Usuario;

  verfCedula: any;
  verfNombre: any;
  verfApellido: any;
  verfCorreo: any;
  verfTitulo: any;
  verfTelefono: any;
  verfPassword: any;

  expCorreo: RegExp = /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/;
  valCorreo: boolean = true;

  constructor(private toastr: ToastrService, private router: Router, private userService: RegisterUserService) { }

  ngOnInit(): void {
    this.cleanCampos();
  }

  cleanCampos() {
    this.usuario.cedula = '';
    this.usuario.nombre = '';
    this.usuario.apellido = '';
    this.usuario.correo = '';
    this.usuario.titulo = '';
    this.usuario.telefono = '';
    this.usuario.password = '';
  }

  validarCorreo() {
    this.valCorreo = this.expCorreo.test(this.usuario.correo!);
    if (this.valCorreo) {
      this.verfCorreo = '';
    } else {
      this.verfCorreo = 'ng-invalid ng-dirty';
    }
  }

  signUpUser() {

    if (this.usuario.cedula === '' || this.usuario.cedula === null) {
      this.verfCedula = 'ng-invalid ng-dirty';
      this.toastr.error("Campo Cédula vacio!", "Error!");
    } else {
      this.verfCedula = '';
    }

    if (this.usuario.nombre === '' || this.usuario.nombre === null) {
      this.verfNombre = 'ng-invalid ng-dirty';
      this.toastr.error("Campo Nombres vacio!", "Error!");
    } else {
      this.verfNombre = '';
    }

    if (this.usuario.apellido === '' || this.usuario.apellido === null) {
      this.verfApellido = 'ng-invalid ng-dirty';
      this.toastr.error("Campo Apellidos vacio!", "Error!");
    } else {
      this.verfApellido = '';
    }

    if (this.usuario.correo === '' || this.usuario.correo === null) {
      this.verfCorreo = 'ng-invalid ng-dirty';
      this.toastr.error("Campo Correo Electrónico vacio!", "Error!");
    } else {
      this.verfCorreo = '';
    }

    if (this.usuario.titulo === '' || this.usuario.titulo === null) {
      this.verfCorreo = 'ng-invalid ng-dirty';
      this.toastr.error("Campo Título vacio!", "Error!");
    } else {
      this.verfCorreo = '';
    }

    if (this.usuario.telefono === '' || this.usuario.telefono === null) {
      this.verfCorreo = 'ng-invalid ng-dirty';
      this.toastr.error("Campo Número de Teléfono vacio!", "Error!");
    } else {
      this.verfCorreo = '';
    }

    if (this.usuario.password === '' || this.usuario.password === null) {
      this.verfPassword = 'ng-invalid ng-dirty';
      this.toastr.error("Campo Contraseña vacio!", "Error!");
    } else {
      this.verfPassword = '';
    }

    if (this.usuario.nombre === '' || this.usuario.apellido === '' || this.usuario.correo === '' || this.usuario.cedula === '' || this.usuario.password === '' || this.usuario.titulo === '' || this.usuario.telefono === ''
      || this.usuario.nombre === null || this.usuario.apellido === null || this.usuario.correo === null || this.usuario.cedula === null || this.usuario.password === null || this.usuario.titulo === null || this.usuario.telefono === null || !this.valCorreo) {

      this.toastr.warning("Verifique que esten correctos los campos")
    } else {
      console.log('llego pero no entro');
      this.userService.signUp(this.usuario).subscribe(
        (result) => {
          console.log('llego y entro');
          console.log(result);
          //this.usuario = result;
          this.toastr.success('Usuario registrado correctamente', 'Bienvenido!')
          this.router.navigate(['/login'])
        }
      )
    }
  }

}
