import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Authority } from 'src/app/core/models/authority';
import { Usuario } from 'src/app/core/models/usuario';
import { UsuarioService } from 'src/app/core/services/usuario.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-listar-usuarios-roles',
  templateUrl: './listar-usuarios-roles.component.html',
  styleUrls: ['./listar-usuarios-roles.component.css']
})
export class ListarUsuariosRolesComponent implements OnInit {

  usuarios: Usuario[];
  authorities: Authority[];

  usuario = new Usuario;
  authority = new Authority;

  roles: string[] = [
    'Director de Carrera',
    'Responsable de Practicas',
    'Practicante',
    'Gerente Empresa',
    'Tutor Académico',
    'Tutor Específico'
  ]

  selectedRol: string;
  loading: boolean = true;
  displayEU: boolean = false;

  constructor(private userService: UsuarioService, private router: Router) { }

  ngOnInit() {
    this.obtenerUsuarios();
  }

  obtenerUsuarios() {

    this.userService.ListUserAuthority().subscribe(
      data => {
        this.authorities = data;
        this.loading = false;
      }
    );
  }

  guardarRol() {

    if (this.selectedRol === 'Responsable de Practicas') {
      this.authority.name = 'ROLE_RESPP';
    }
    if (this.selectedRol === 'Practicante') {
      this.authority.name = 'ROLE_ESTUD';
    }
    if (this.selectedRol === 'Tutor Académico') {
      this.authority.name = 'ROLE_TISTA';
    }
    if (this.selectedRol === 'Director de Carrera') {
      this.authority.name = 'ROLE_DIREC';
    }
    if (this.selectedRol === 'Tutor Específico') {
      this.authority.name = 'ROLE_TEMP';
    }
    if (this.selectedRol === 'Gerente Empresa') {
      this.authority.name = 'ROLE_GEREN';
    }

    console.log(this.authority.name)

    this.authority.usuario = this.usuario;

    this.userService.actualizarRol(this.authority.id, this.authority.name).subscribe(
      result => {
        console.log(result);
        Swal.fire('Aprobacion', 'Nuevo Rol Asignado Para ' + this.usuario.nombre + ' ' + this.usuario.apellido, 'success');
        this.limpiar();
        //this.router.navigate(['/dashboard'])
      }
    )
  }

  editarUsuario(authority: Authority) {

    this.displayEU = true;

    this.authority.id = authority.id;

    this.userService.getRoles(this.authority.name).subscribe(
      (result) => {
        console.log(result);
        this.usuarios = result;
      }
    )

    this.usuario.id = authority.usuario.id;
    this.usuario.cedula = authority.usuario.cedula;
    this.usuario.nombre = authority.usuario.nombre;
    this.usuario.apellido = authority.usuario.apellido;
    this.usuario.correo = authority.usuario.correo;
    this.usuario.telefono = authority.usuario.telefono;
    this.usuario.titulo = authority.usuario.titulo;
    this.authority.name = authority.name;

    if (this.authority.name === 'ROLE_RESPP') {
      this.selectedRol = 'Responsable de Practicas';
    }
    if (this.authority.name == 'ROLE_ESTUD') {
      this.selectedRol = 'Practicante';
    }
    if (this.authority.name == 'ROLE_TISTA') {
      this.selectedRol = 'Tutor Académico';
    }
    if (this.authority.name == 'ROLE_DIREC') {
      this.selectedRol = 'Director de Carrera';
    }
    if (this.authority.name == 'ROLE_TEMP') {
      this.selectedRol = 'Tutor Específico';
    }
    if (this.authority.name == 'ROLE_GEREN') {
      this.selectedRol = 'Gerente Empresa';
    }

  }

  cancelar() {
    this.limpiar();
  }

  limpiar() {
    this.displayEU = false;

    this.authority = new Authority;
    this.usuario = new Usuario;

    this.loading = true;
    this.authorities = [];
    this.obtenerUsuarios();
  }
}
