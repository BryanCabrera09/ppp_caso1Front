import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { DocenteFenix } from 'src/app/core/models/docente-fenix';
import { Usuario } from 'src/app/core/models/usuario';
import { RegisterUserService } from 'src/app/core/services/register-user.service';
import { UsersfenixService } from 'src/app/core/services/usersfenix.service';

@Component({
  selector: 'app-register-user',
  templateUrl: './register-user.component.html',
  styleUrls: ['./register-user.component.css']
})
export class RegisterUserComponent implements OnInit {

  usuario: Usuario = new Usuario;

  selectedRol: string;

  roles: string[] = [
    'Director de Carrera',
    'Responsable de Practicas'
  ]

  constructor(private toastr: ToastrService, private router: Router, private userService: RegisterUserService,
    private fenixService: UsersfenixService) { }

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

  signUpUser() {

    if (this.usuario.cedula === '' || this.usuario.cedula === null) {
      this.toastr.error("Campo Cédula vacio!", "Error!");
    }

    if (this.usuario.nombre === '' || this.usuario.nombre === null) {
      this.toastr.error("Campo Nombres vacio!", "Error!");
    }

    if (this.usuario.apellido === '' || this.usuario.apellido === null) {
      this.toastr.error("Campo Apellidos vacio!", "Error!");
    }

    if (this.usuario.correo === '' || this.usuario.correo === null) {
      this.toastr.error("Campo Correo Electrónico vacio!", "Error!");
    }

    if (this.usuario.titulo === '' || this.usuario.titulo === null) {
      this.toastr.error("Campo Título vacio!", "Error!");
    }

    if (this.usuario.telefono === '' || this.usuario.telefono === null) {
      this.toastr.error("Campo Número de Teléfono vacio!", "Error!");
    }

    if (this.usuario.password === '' || this.usuario.password === null) {
      this.toastr.error("Campo Contraseña vacio!", "Error!");
    }

    if (this.usuario.nombre === '' || this.usuario.apellido === '' || this.usuario.correo === '' || this.usuario.cedula === '' || this.usuario.password === '' || this.usuario.titulo === '' || this.usuario.telefono === ''
      || this.usuario.nombre === null || this.usuario.apellido === null || this.usuario.correo === null || this.usuario.cedula === null || this.usuario.password === null || this.usuario.titulo === null || this.usuario.telefono === null) {

      this.toastr.warning("Verifique que esten correctos los campos")
    } else {
      /* this.estudiante.periodo = this.usuario.periodo;
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
      ); */
    };
  }

  buscarCedulaCompleta() {
    if (this.usuario.cedula.length === 10) {
      this.buscarDocente();
    } else {
      this.usuario.nombre = '';
      this.usuario.apellido = '';
      this.usuario.correo = '';
      this.usuario.titulo = '';
      this.usuario.telefono = '';
      this.usuario.password = '';
    }
  }

  buscarDocente() {
    this.fenixService.searchStudent(this.usuario.cedula).subscribe(
      (data: DocenteFenix) => {
        this.usuario.nombre = data.nombres;
        this.usuario.apellido = data.apellidos;
        this.usuario.correo = data.correo;
        this.usuario.titulo = data.titulo;
        this.usuario.telefono = data.telefono;
        this.usuario.alumno_docenteId = data.alumno_docenteId;
        console.log(data);
      }
    );
  }
}
