import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { DocenteFenix } from 'src/app/core/models/docente-fenix';
import { TutorInstituto } from 'src/app/core/models/tutor-academico';
import { Usuario } from 'src/app/core/models/usuario';
import { RegisterUserService } from 'src/app/core/services/register-user.service';
import { TutorAcademicoService } from 'src/app/core/services/tutor-academico.service';
import { UsersfenixService } from 'src/app/core/services/usersfenix.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register-user',
  templateUrl: './register-user.component.html',
  styleUrls: ['./register-user.component.css']
})
export class RegisterUserComponent implements OnInit {

  tutorInstituto = new TutorInstituto;
  usuario: Usuario = new Usuario;

  selectedRol: string;
  role: string;

  roles: string[] = [
    'Director de Carrera',
    'Responsable de Practicas'
  ]

  constructor(private toastr: ToastrService, private router: Router, private userService: RegisterUserService,
    private fenixService: UsersfenixService, private tutorService: TutorAcademicoService,) { }

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
    this.selectedRol = null;
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

    if (this.selectedRol === '' || this.selectedRol === null) {
      this.toastr.error("Campo Contraseña vacio!", "Error!");
    }

    if (this.usuario.nombre === '' || this.usuario.apellido === '' || this.usuario.correo === '' || this.usuario.cedula === '' || this.usuario.password === '' || this.usuario.titulo === '' || this.usuario.telefono === ''
      || this.usuario.nombre === null || this.usuario.apellido === null || this.usuario.correo === null || this.usuario.cedula === null || this.usuario.password === null || this.usuario.titulo === null || this.usuario.telefono === null
      || this.selectedRol === '' || this.selectedRol === null) {

      this.toastr.warning("Verifique que esten correctos los campos")
    } else {
      this.tutorInstituto.usuario = this.usuario;

      if (this.selectedRol === 'Director de Carrera') {
        this.role = 'ROLE_DIREC';
      } else if (this.selectedRol === 'Responsable de Practicas') {
        this.role = 'ROLE_RESPP';
      }

      this.tutorService.registerTutor(this.tutorInstituto, this.role).subscribe(
        (result) => {
          console.log(result);
          if (this.selectedRol === 'Director de Carrera') {
            Swal.fire('Registro', 'Director de Carrera Creado', 'success');
            this.cleanCampos();
            /* this.router.navigate(['/login']) */
          } else if (this.selectedRol === 'Responsable de Practicas') {
            Swal.fire('Registro', 'Responsable de Practicas Creado', 'success');
            this.cleanCampos();
            /* this.router.navigate(['/login']) */
          }
        }
      );
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
    this.fenixService.searchDocenteByCedula(this.usuario.cedula).subscribe(
      (data: DocenteFenix) => {
        this.usuario.nombre = data.nombres;
        this.usuario.apellido = data.apellidos;
        this.usuario.correo = data.correo;
        this.usuario.titulo = data.titulo;
        this.usuario.telefono = data.telefono;
        this.usuario.correo = data.correo;
        this.usuario.activo = true;
        this.tutorInstituto.idDocente = data.alumno_docenteId;
        this.tutorInstituto.usuario = this.usuario;
        console.log(data);
      }
    );
  }
}
