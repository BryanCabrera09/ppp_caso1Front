import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Practicante } from 'src/app/core/models/practicante';
import { SolipracticantesService } from 'src/app/core/services/solipracticantes.service';

//PrimeNg Imports
import { Table } from 'primeng/table';
import Swal from 'sweetalert2';
import { Usuario } from 'src/app/core/models/usuario';
import { Estudiante } from 'src/app/core/models/estudiante';
import { PracticasService } from 'src/app/core/services/practicas.service';
import { Practica } from 'src/app/core/models/practica';
import { ConvocatoriaP } from 'src/app/core/models/convocatoria-p';
import { ToastrService } from 'ngx-toastr';
import { ConvocatoriaService } from 'src/app/core/services/convocatoria.service';

@Component({
  selector: 'app-aceptacion-solicitud-director',
  templateUrl: './aceptacion-solicitud-director.component.html',
  styleUrls: ['./aceptacion-solicitud-director.component.css']
})
export class AceptacionSolicitudDirectorComponent implements OnInit {

  practicantes: Practicante[] = [];

  convocatoria = new ConvocatoriaP;
  practestudiant = new Practicante;
  practica = new Practica;
  usuario = new Usuario;
  estudiante = new Estudiante;

  estado: string;
  estadoaprov: string;
  id: number;
  displayEU: boolean = false;

  fechaI: Date;
  fechaF: Date;

  aprobado: boolean;

  loading: boolean = true;
  statuses: any[] = [];

  constructor(private solicitudService: SolipracticantesService, private router: Router, private activatedRoute: ActivatedRoute,
    private practicaService: PracticasService, private toastr: ToastrService, private convocatoriaService: ConvocatoriaService) { }

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
        this.solicitudService.getPostulantesByEstadoPend(id).subscribe(
          data => {
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
                practicante.fechaEnvio = result.fechaEnvio;
                this.estudiante = result.estudiante;
                return practicante;
              }
            );
            this.loading = false;
          }
        );
      }
    })
  }

  registrarPractica() {

    this.activatedRoute.params.subscribe(params => {
      let id = params['id']
      console.log(id)
      if (id) {
        this.convocatoriaService.searchConvocatoriaById(id).subscribe(
          (result: ConvocatoriaP) => {
            this.convocatoria = result;
          }
        )
      }
    })

    this.practica.convocatoria = this.convocatoria;
    this.practica.estudiante = this.estudiante;
    this.fechaI = this.convocatoria.solicitudEmpresa.fechaInicioTen;
    this.fechaF = this.convocatoria.solicitudEmpresa.fechaMaxTen;
    this.practica.inicio = this.fechaI;
    this.practica.fin = this.fechaF;
    this.practicaService.create(this.practica).subscribe(
      result => {
        /*  console.log(result);
         Swal.fire('Aprobacion', 'Aprobacion Registrada', 'success');
         this.limpiar();
         this.router.navigate(['/dashboard']) */
      }
    )
  }

  guardarPostulacion() {

    if (this.practestudiant.estado === 0) {
      if (this.estado === 'aprobado') {
        this.practestudiant.estado = 1;
      } else if (this.estado === 'desaprobado') {
        this.practestudiant.estado = 3;
      }
    } else if (this.practestudiant.estado === 1) {
      if (this.estado === 'aprobado') {
        this.practestudiant.estado = 2;
        this.aprobado = true;
        this.toastr.success('Complete los campos habilitados');
      } else if (this.estado === 'desaprobado') {
        this.practestudiant.estado = 3;
        this.estudiante.prioridad = true;
      }
    } else if (this.practestudiant.estado === 2) {
      if (this.estado === 'aprobado') {
        this.practestudiant.estado = 2;
      } else if (this.estado === 'desaprobado') {
        this.practestudiant.estado = 1;
      }
    }

    if (this.practica.nsemanas !== null || this.practica.nsemanas !== undefined && this.practica.departamento !== null || this.practica.departamento !== '' || this.practica.departamento !== undefined) {
      this.practestudiant.estudiante = this.estudiante;

      console.log(this.practestudiant.estado);
      this.registrarPractica();
      this.solicitudService.updatePostulacion(this.practestudiant, this.practestudiant.id).subscribe(
        result => {
          console.log(result);
          Swal.fire('Aprobacion', 'Aprobacion Registrada', 'success');
          this.limpiar();
          this.router.navigate(['/dashboard'])
        }
      )
    } else {
      this.toastr.success('Complete los campos habilitados');
    }
  }

  editarPracticante(practicante: Practicante) {

    this.displayEU = true;

    this.practestudiant.id = practicante.id;

    this.solicitudService.searchPracticanteById(this.practestudiant.id).subscribe(
      (result: Practicante) => {
        console.log(result);
        this.practestudiant.estudiante = result.estudiante;
        this.practestudiant.convocatoria = result.convocatoria;
      }
    )

    this.practestudiant.cedula = practicante.cedula;
    this.practestudiant.nombre = practicante.nombre;
    this.practestudiant.apellido = practicante.apellido;
    this.practestudiant.ciclo = practicante.ciclo;
    this.practestudiant.correo = practicante.correo;
    this.practestudiant.estado = practicante.estado;
    this.practestudiant.fechaEnvio = practicante.fechaEnvio;
  }

  cancelar() {
    this.limpiar();
  }

  limpiar() {
    this.displayEU = false;

    this.practestudiant = new Practicante;
    this.convocatoria = new ConvocatoriaP;
    this.practica = new Practica;
    this.usuario = new Usuario;
    this.estudiante = new Estudiante;

    this.loading = true;
    this.practicantes = [];
    this.obtenerSolicitudes();
  }
}
