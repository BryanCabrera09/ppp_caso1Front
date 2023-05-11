import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Carrera } from 'src/app/core/models/carrera';
import { UserFenix } from 'src/app/core/models/user-fenix';
import { Usuario } from 'src/app/core/models/usuario';
import { RegisterUserService } from 'src/app/core/services/register-user.service';
import { UsersfenixService } from 'src/app/core/services/usersfenix.service';

@Component({
  selector: 'app-reg-user',
  templateUrl: './reg-user.component.html',
  styleUrls: ['./reg-user.component.css']
})
export class RegUserComponent implements OnInit {

  usuario: Usuario = new Usuario;
  estudiante: UserFenix = new UserFenix;
  carrera: Carrera = new Carrera;

  verfCedula: any;
  verfNombre: any;
  verfApellido: any;
  verfCorreo: any;
  verfTitulo: any;
  verfTelefono: any;
  verfPassword: any;

  expCorreo: RegExp = /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/;
  valCorreo: boolean = true;

  constructor(private toastr: ToastrService, private router: Router, private userService: RegisterUserService, private fenixService: UsersfenixService) { }

  ngOnInit() {

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
      /*  console.log('llego pero no entro'); */
      this.usuario.activo = true;
      this.estudiante.periodo = this.usuario.periodo;
      this.estudiante.ciclo = this.usuario.ciclo;
      this.estudiante.idEstudiante = this.usuario.id_estudiante;
      this.estudiante.horasCumplidas = this.usuario.horasCumplidas;
      this.estudiante.prioridad = true;
      this.estudiante.carrera = this.carrera;
      this.estudiante.usuario = this.usuario;
      console.log(this.estudiante);
      this.userService.registerStudent(this.estudiante).subscribe(
        (result) => {
          console.log('llego y entro');
          console.log(result);
          this.toastr.success('Usuario registrado correctamente', 'Bienvenido!')
          this.router.navigate(['/login'])
        }
      )
    };
  }

  buscarCedulaCompleta() {
    if (this.usuario.cedula.length === 10) {
      this.buscarEstudiantes();
    } else {
      this.usuario.nombre = '';
      this.usuario.apellido = '';
      this.usuario.correo = '';
      this.usuario.titulo = '';
      this.usuario.telefono = '';
      this.usuario.password = '';
    }
  }

  buscarEstudiantes() {
    this.fenixService.searchStudent(this.usuario.cedula).subscribe(
      (data: UserFenix) => {
        this.usuario.nombre = data.nombres;
        this.usuario.apellido = data.apellidos;
        this.usuario.correo = data.correo;
        this.usuario.titulo = data.titulo;
        this.usuario.telefono = data.telefono;
        this.usuario.id_estudiante = data.alumno_docenteId;
        this.usuario.periodo = data.periodo;
        this.usuario.ciclo = data.ciclo;
        this.usuario.horasCumplidas = data.horasCumplidas;
        //this.estudiante = data;
        console.log(data);
        console.log(this.usuario);
      }, (error) => {
        this.toastr.error(error.error.Mensaje, "Error!");
      }
    );
  }
}
