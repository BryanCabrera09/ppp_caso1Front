import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Actividad } from 'src/app/core/models/actividad';
import { Convenio } from 'src/app/core/models/convenio';
import { Empresa } from 'src/app/core/models/empresa';
import { SolicitudEmpresa } from 'src/app/core/models/solicitud-empresa';
import { TutorAcademico } from 'src/app/core/models/tutor-academicoRS';
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

  loading: boolean = true;
  displayEU: boolean = false;

  estado: string;
  estadoaprov: string;
  id: number;
  nombreEmp: string;
  rucEmp: string;
  actividad: string;

  constructor(private router: Router, private solicitudService: SoliEmpresaService) { }

  ngOnInit() {
    this.obtenerSolicitudes();
  }

  obtenerSolicitudes() {

    this.solicitudService.ListarSoli().subscribe(
      data => {
        this.empresas = data.map(
          result => {
            let solicitud = new SolicitudEmpresa;
            solicitud.id = result.id;
            solicitud.fechaInicioTen = result.fechaInicioTen;
            solicitud.fechaMaxTen = result.fechaMaxTen;
            solicitud.numHoras = result.numHoras;
            solicitud.numPracticantes = result.numPracticantes;
            //this.actividad = result.actividad.descripcion;
            this.convenio = result.convenio;
            this.empresa = result.convenio.empresa;
            this.tutorInstituto = result.convenio.firmaInst;
            this.nombreEmp = result.convenio.empresa.nombre;
            this.rucEmp = result.convenio.empresa.ruc;
            console.log(solicitud)
            return solicitud;
          }
        );
        this.loading = false;
      }
    );
  }

  guardarPostulacion() {

    if (this.estado === 'aprobado') {
      this.solicitudEmpre.estado = 1;
    } else if (this.estado === 'desaprobado') {
      this.solicitudEmpre.estado = 2;
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

  /* sumarUnDia() {

    if (this.solicitudEmpre.fechaMaxTen instanceof Date) {
      this.solicitudEmpre.fechaMaxTen.setDate(this.solicitudEmpre.fechaMaxTen.getDate() + 1);
      alert(this.solicitudEmpre.fechaMaxTen)
    }
    
    if (this.solicitudEmpre.fechaInicioTen instanceof Date) {
      this.solicitudEmpre.fechaInicioTen.setDate(this.solicitudEmpre.fechaInicioTen.getDate() + 1);
      alert(this.solicitudEmpre.fechaInicioTen)
    }
  } */

  editarEmpresa(solicitudEmp: SolicitudEmpresa) {

    this.displayEU = true;

    this.solicitudEmpre.id = solicitudEmp.id;
    this.solicitudEmpre.actividad = solicitudEmp.actividad;
    this.solicitudEmpre.convenio = this.convenio;
    this.solicitudEmpre.estado = solicitudEmp.estado;
    this.solicitudEmpre.fechaInicioTen = solicitudEmp.fechaInicioTen;
    this.solicitudEmpre.fechaMaxTen = solicitudEmp.fechaMaxTen;
    this.solicitudEmpre.numHoras = solicitudEmp.numHoras;
    this.solicitudEmpre.numPracticantes = solicitudEmp.numPracticantes;
  }

  cancelar() {
    this.limpiar();
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
