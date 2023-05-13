import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Carrera } from 'src/app/core/models/carrera';
import { Estudiante } from 'src/app/core/models/estudiante';
import { Usuario } from 'src/app/core/models/usuario';
import { CarreraMateriaService } from 'src/app/core/services/carrera-materia.service';
import { RegisterUserService } from 'src/app/core/services/register-user.service';
import { UsersfenixService } from 'src/app/core/services/usersfenix.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-reg-user',
  templateUrl: './reg-user.component.html',
  styleUrls: ['./reg-user.component.css']
})
export class RegUserComponent implements OnInit {

  usuario: Usuario = new Usuario;
  estudiante: Estudiante = new Estudiante;
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

  constructor(private toastr: ToastrService, private router: Router, private userService: RegisterUserService, private fenixService: UsersfenixService, private carreraService: CarreraMateriaService) { }

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
      this.estudiante.periodo = this.usuario.periodo;
      this.estudiante.ciclo = this.usuario.ciclo;
      this.estudiante.idEstudiante = this.usuario.idEstudiante;
      this.estudiante.horasCumplidas = 0;
      this.estudiante.prioridad = false;
      this.usuario.activo = true;
      this.estudiante.usuario = this.usuario;
      this.estudiante.carrera = this.carrera;
      console.log(this.estudiante);
      this.userService.registerStudent(this.estudiante).subscribe(
        (result) => {
          console.log('llego y entro');
          console.log(result);
          Swal.fire('Registro', 'Usuario registrado correctamente', 'success');
          this.router.navigate(['/login'])
        }
      );
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
      (data: Estudiante) => {
        this.usuario.nombre = data.nombres;
        this.usuario.apellido = data.apellidos;
        this.usuario.correo = data.correo;
        this.usuario.titulo = data.titulo;
        this.usuario.telefono = data.telefono;
        this.usuario.idEstudiante = data.alumno_docenteId;
        this.usuario.periodo = data.periodo;
        this.usuario.ciclo = data.ciclo;
        this.carrera.carreraId = data.carreraId;
        /* console.log(data);
        console.log(this.carrera.carreraId); */
        this.carreraService.searchCarrera(this.carrera.carreraId).subscribe(
          (data: Carrera) => {
            this.carrera.nombre = data.nombre;
            //this.carrera.id = data.id;
            //this.carrera.activo = data.activo;
            /* console.log(data);
            console.log(this.carrera); */
          }, (error) => {
            this.toastr.error(error.error.Mensaje, "Error!");
          }
        );
      }, (error) => {
        this.toastr.error(error.error.Mensaje, "Error!");
      }
    );
  }
}
