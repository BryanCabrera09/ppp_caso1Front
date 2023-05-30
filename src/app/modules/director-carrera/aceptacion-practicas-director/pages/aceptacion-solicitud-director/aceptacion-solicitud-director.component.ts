import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

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
import { HttpResponse } from '@angular/common/http';
import { SoliEstudiante } from 'src/app/core/models/soli-estudiante';
import { SoliEstudianteService } from 'src/app/core/services/soli-estudiante.service';
import { SolicitudEmpresa } from 'src/app/core/models/solicitud-empresa';

@Component({
  selector: 'app-aceptacion-solicitud-director',
  templateUrl: './aceptacion-solicitud-director.component.html',
  styleUrls: ['./aceptacion-solicitud-director.component.css']
})
export class AceptacionSolicitudDirectorComponent implements OnInit {

  solicitudes: SoliEstudiante[] = [];

  convocatoria = new ConvocatoriaP;
  practica = new Practica;
  usuario = new Usuario;
  estudiante = new Estudiante;
  solicitud = new SoliEstudiante;
  soliEmpresa = new SolicitudEmpresa;

  estado: string;
  estadoaprov: string;
  id: number;
  displayEU: boolean = false;
  entro: number;

  fechaI: Date;
  fechaF: Date;

  aprobado: boolean;

  loading: boolean = true;
  statuses: any[] = [];

  constructor(private router: Router, private activatedRoute: ActivatedRoute, private soliEstudianteService: SoliEstudianteService,
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
        this.soliEstudianteService.getPostulantesByEstadoPend(id).subscribe(
          data => {
            this.solicitudes = data;
            console.log(this.solicitudes);
          }
        );
        this.loading = false;
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
    this.practicaService.create(this.practica).subscribe()
  }

  descargarPDF(value) {
    this.soliEstudianteService.obtenerPDF(value).subscribe(response => {
      const filename = this.getFilenameFromResponse(response);
      this.downloadFile(response.body, filename);
    });
  }

  private getFilenameFromResponse(response: HttpResponse<Blob>): string {
    const contentDispositionHeader = response.headers.get('Content-Disposition');
    const matches = /filename[^;=\n]*=((['"]).*?\2|[^;\n]*)/.exec(contentDispositionHeader);
    if (matches != null && matches[1]) {
      return matches[1].replace(/['"]/g, '');
    }
    return 'documento.pdf';
  }

  private downloadFile(data: Blob, filename: string) {
    const blob = new Blob([data], { type: 'application/pdf' });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    link.click();
    window.URL.revokeObjectURL(url);
  }

  guardarPostulacion() {

    if (this.solicitud.estado === 0) {
      if (this.estado === 'aprobado') {
        this.solicitud.estado = 1;
        this.entro = 1;
      } else if (this.estado === 'desaprobado') {
        this.solicitud.estado = 3;
      }
    } else if (this.solicitud.estado === 1 && this.entro !== 1) {
      if (this.estado === 'aprobado') {
        this.solicitud.estado = 2;
        this.aprobado = true;
        this.toastr.success('Complete los campos habilitados');
      } else if (this.estado === 'desaprobado') {
        this.solicitud.estado = 3;
        this.estudiante.prioridad = true;
      }
    } else if (this.solicitud.estado === 2) {
      if (this.estado === 'aprobado') {
        this.solicitud.estado = 2;
      } else if (this.estado === 'desaprobado') {
        this.solicitud.estado = 1;
      }
    }

    if (this.practica.nsemanas !== null || this.practica.nsemanas !== undefined && this.practica.departamento !== null || this.practica.departamento !== '' || this.practica.departamento !== undefined) {

      this.solicitud.estudiante = this.estudiante;

      console.log(this.solicitud.estado);
      this.registrarPractica();
      this.soliEstudianteService.updatePostulacion(this.solicitud, this.solicitud.id).subscribe(
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

  editarPracticante(solicitud: SoliEstudiante) {

    this.displayEU = true;

    this.solicitud.id = solicitud.id;
    this.solicitud = solicitud;

    this.soliEstudianteService.searchSoliEstudianteById(this.solicitud.id).subscribe(
      (result: SoliEstudiante) => {
        console.log(result);
        this.estudiante = result.estudiante;
        this.usuario = result.estudiante.usuario;
        this.soliEmpresa = result.convocatoria.solicitudEmpresa;
        this.solicitud.estudiante = result.estudiante;
        this.solicitud.convocatoria = result.convocatoria;
      }
    )

    this.solicitud.estudiante.usuario.cedula = solicitud.estudiante.usuario.cedula;
    this.solicitud.estudiante.usuario.nombre = solicitud.estudiante.usuario.nombre;
    this.solicitud.estudiante.usuario.apellido = solicitud.estudiante.usuario.apellido;
    this.solicitud.estudiante.usuario.ciclo = solicitud.estudiante.usuario.ciclo;
    this.solicitud.estudiante.usuario.correo = solicitud.estudiante.usuario.correo;
    this.solicitud.estado = solicitud.estado;
    this.solicitud.fechaEnvio = solicitud.fechaEnvio;
  }

  cancelar() {
    this.limpiar();
  }

  limpiar() {
    this.displayEU = false;

    this.convocatoria = new ConvocatoriaP;
    this.practica = new Practica;
    this.solicitud = new SoliEstudiante;
    this.usuario = new Usuario;
    this.estudiante = new Estudiante;

    this.loading = true;
    this.solicitudes = [];
    this.obtenerSolicitudes();
  }
}
