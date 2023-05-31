import { HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Actividad } from 'src/app/core/models/actividad';
import { Convenio } from 'src/app/core/models/convenio';
import { Empresa } from 'src/app/core/models/empresa';
import { SolicitudEmpresa } from 'src/app/core/models/solicitud-empresa';
import { TutorAcademico } from 'src/app/core/models/tutor-academicoRS';
import { ActividadpService } from 'src/app/core/services/actividadp.service';
import { SoliEmpresaService } from 'src/app/core/services/soli-empresa.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-aceptacion-solicitud',
  templateUrl: './aceptacion-solicitud.component.html',
  styleUrls: ['./aceptacion-solicitud.component.css']
})
export class AceptacionSolicitudComponent implements OnInit {

  empresas: Empresa[];
  actividades: Actividad[];

  solicitudEmpre = new SolicitudEmpresa;
  empresa = new Empresa;
  convenio = new Convenio;
  tutorInstituto = new TutorAcademico;
  actividad = new Actividad;

  loading: boolean = true;
  displayEU: boolean = false;

  estado: string;
  estadoaprov: string;
  id: number;
  nombreEmp: string;
  rucEmp: string;
  actividadDescript: string;

  constructor(private router: Router, private solicitudService: SoliEmpresaService, private actividadService: ActividadpService) { }

  ngOnInit() {
    this.obtenerSolicitudes();
  }

  obtenerSolicitudes() {

    this.solicitudService.ListarSoliPend().subscribe(
      data => {
        this.empresas = data;
      }
    );
    this.loading = false;
  }

  guardarPostulacion() {

    if (this.estado === 'aprobado') {
      this.solicitudEmpre.estado = 2;
    } else if (this.estado === 'desaprobado') {
      this.solicitudEmpre.estado = 3;
    }

    console.log(this.solicitudEmpre.estado);
    this.solicitudService.updatePostulacion(this.solicitudEmpre, this.solicitudEmpre.id).subscribe(
      result => {
        console.log(result);
        Swal.fire('Aprobacion', 'Aprobacion Registrada', 'success');
        this.limpiar();
        this.router.navigate(['/dashboard'])
      }
    )
  }

  editarEmpresa(solicitudEmp: SolicitudEmpresa) {

    this.displayEU = true;

    this.solicitudEmpre.id = solicitudEmp.id;
    this.solicitudEmpre.actividad = solicitudEmp.actividad;
    this.solicitudEmpre.convenio = solicitudEmp.convenio;
    this.solicitudEmpre.convenio.empresa = solicitudEmp.convenio.empresa;
    this.solicitudEmpre.estado = solicitudEmp.estado;
    this.solicitudEmpre.fechaInicioTen = solicitudEmp.fechaInicioTen;
    this.solicitudEmpre.fechaMaxTen = solicitudEmp.fechaMaxTen;
    this.solicitudEmpre.numHoras = solicitudEmp.numHoras;
    this.solicitudEmpre.numPracticantes = solicitudEmp.numPracticantes;
    console.log(solicitudEmp);

    this.actividadService.obtenerActividadid(this.solicitudEmpre.id).subscribe(
      (data) => {
        this.actividades = data;
        this.actividad = this.actividades.length > 0 ? this.actividades[0] : null;
        this.actividadDescript = this.actividades.reduce((descriptions, actividad) => {
          if (actividad.descripcion) {
            descriptions.push(' - ' + actividad.descripcion);
          }
          return descriptions;
        }, []).join("\n");
        console.log(this.actividades)
        console.log(this.actividadDescript)
      }
    )
  }

  cancelar() {
    this.limpiar();
  }

  descargarPDF(value) {
    this.solicitudService.obtenerPDF(value).subscribe(response => {
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
    return 'solicitud-empresa.pdf';
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

  limpiar() {
    this.displayEU = false;
    this.convenio = new Convenio;
    this.empresa = new Empresa;
    this.tutorInstituto = new TutorAcademico;

    this.loading = true;
    this.empresas = [];
    this.obtenerSolicitudes();
  }
}
