import { Component, OnInit } from '@angular/core';
import { Practicante } from 'src/app/core/models/practicante';

//PrimeNg Imports
import { Table } from 'primeng/table';
import { SolipracticantesService } from 'src/app/core/services/solipracticantes.service';
import { ActivatedRoute, Router } from '@angular/router';

import Swal from 'sweetalert2';
import { Convocatoria } from 'src/app/core/models/convocatoria';
import { Usuario } from 'src/app/core/models/usuario';
import { Estudiante } from 'src/app/core/models/estudiante';

@Component({
  selector: 'app-aceptacion-solicitudes',
  templateUrl: './aceptacion-solicitudes.component.html',
  styleUrls: ['./aceptacion-solicitudes.component.css']
})
export class AceptacionSolicitudesComponent implements OnInit {

  practicantes: Practicante[] = [];

  convocatoria = new Convocatoria;
  practestudiant = new Practicante;

  usuario = new Usuario;
  estudiante = new Estudiante;

  estado: string;
  estadoaprov: string;
  id: number;
  displayEU: boolean = false;

  loading: boolean = true;
  statuses: any[] = [];

  aprobISTA: boolean;
  aprobEmpr: boolean;

  constructor(private solicitudService: SolipracticantesService, private router: Router, private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.obtenerSolicitudes();
  }

  clear(table: Table) {
    table.clear();
  }

  obtenerSolicitudes() {
    this.activatedRoute.params.subscribe(params => {
      let id = params['id']
      console.log(id)
      if (id) {
        this.solicitudService.getPostulantes(id).subscribe(
          data => {
            console.log(this.practicantes);
            this.practicantes = data.map(
              result => {
                let practicante = new Practicante;
                practicante.cedula = result.estudiante.usuario.cedula;
                practicante.nombre = result.estudiante.usuario.nombre;
                practicante.apellido = result.estudiante.usuario.apellido;
                practicante.ciclo = result.estudiante.ciclo;
                practicante.id = result.id;
                practicante.correo = result.estudiante.usuario.correo;
                practicante.estado = result.estado;
                this.usuario = result.estudiante.usuario;
                this.estudiante = result.estudiante;
                this.convocatoria = result.convocatoria;
                return practicante;
              }
            );
            this.loading = false;
          }
        );
      }
    })
  }

  guardarPostulacion() {

    if (this.practestudiant.estado === 0) {
      if (this.estado === 'aprobado') {
        this.practestudiant.estado = 1;
        this.aprobISTA = true;
        this.aprobEmpr = false;
      } else if (this.estado === 'desaprobado') {
        this.practestudiant.estado = 3;
        this.aprobISTA = false;
        this.aprobEmpr = false;
      }
    } else if (this.practestudiant.estado === 3) {
      if (this.estado === 'aprobado') {
        this.practestudiant.estado = 2;
        this.aprobISTA = true;
        this.aprobEmpr = false;
      } else if (this.estado === 'desaprobado') {
        this.practestudiant.estado = 1;
        this.aprobISTA = false;
        this.aprobEmpr = false;
      }
    } else if (this.practestudiant.estado === 2) {
      if (this.estado === 'aprobado') {
        this.practestudiant.estado = 2;
        this.aprobISTA = true;
        this.aprobEmpr = true;
        this.practestudiant.estado = 4;
      } else if (this.estado === 'desaprobado') {
        this.practestudiant.estado = 1;
        this.aprobISTA = false;
        this.aprobEmpr = true;
      }
    }


    this.practestudiant.fechaEnvio = new Date();

    console.log(this.practestudiant.estado);
    this.solicitudService.updatePostulacion(this.practestudiant, this.practestudiant.id).subscribe(
      result => {
        console.log(result);
        Swal.fire('Aprobacion', 'Aprobacion Registrada', 'success');
        this.limpiar();
        this.router.navigate(['/dashboard'])
      }
    )
  }

  editarPracticante(practicante: Practicante) {

    this.displayEU = true;

    this.practestudiant.cedula = practicante.cedula;
    this.practestudiant.nombre = practicante.nombre;
    this.practestudiant.apellido = practicante.apellido;
    this.practestudiant.ciclo = practicante.ciclo;
    this.practestudiant.correo = practicante.correo;
    this.practestudiant.id = practicante.id;
    this.practestudiant.usuario = this.usuario;
    this.practestudiant.estudiante = this.estudiante;
    this.practestudiant.convocatoria = this.convocatoria;
  }

  cancelar() {
    this.limpiar();
  }

  limpiar() {
    this.displayEU = false;
    this.convocatoria = new Convocatoria;
    this.usuario = new Usuario;
    this.estudiante = new Estudiante;

    this.loading = true;
    this.practicantes = [];
    this.obtenerSolicitudes();
  }
}
