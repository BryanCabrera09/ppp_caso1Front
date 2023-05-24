import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/core/models/usuario';
import { UsuarioService } from 'src/app/core/services/usuario.service';

@Component({
  selector: 'app-listar-usuarios-roles',
  templateUrl: './listar-usuarios-roles.component.html',
  styleUrls: ['./listar-usuarios-roles.component.css']
})
export class ListarUsuariosRolesComponent implements OnInit {

  usuarios: Usuario[];

  loading: boolean = true;
  displayEU: boolean = false;

  constructor(private userService: UsuarioService) { }

  ngOnInit() {
    this.obtenerUsuarios();
  }

  obtenerUsuarios() {

    this.userService.ListarUsers().subscribe(
      data => {
        this.usuarios = data.map(
          result => {
            let usuario = new Usuario;
            usuario.id = result.id;
            usuario.cedula = result.cedula;
            usuario.nombre = result.nombre;
            usuario.apellido = result.apellido;
            usuario.correo = result.correo;
            usuario.telefono = result.telefono;
            usuario.titulo = result.titulo;
            return usuario;
          }
        );
        this.loading = false;
      }
    );
  }
}
