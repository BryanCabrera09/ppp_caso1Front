import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Convenio } from 'src/app/core/models/convenio';
import { Empresa } from 'src/app/core/models/empresa';
import { SolicitudEmpresa } from 'src/app/core/models/solicitud-empresa';
import { ConvenioService } from 'src/app/core/services/convenio.service';
import { RegEmpresaServiceService } from 'src/app/core/services/reg-empresa-service.service';
import { SoliEmpresaService } from 'src/app/core/services/soli-empresa.service';
import { SolicitudEmpresaService } from 'src/app/core/services/solicitud-empresa.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-soli-est',
  templateUrl: './soli-est.component.html',
  styleUrls: ['./soli-est.component.css']
})
export class SoliEstComponent implements OnInit {

  convenio: Convenio = new Convenio();
  soliempresa: SolicitudEmpresa = new SolicitudEmpresa();
  empresas: Empresa = new Empresa();
  SolicitudA: SolicitudEmpresa[];

  selectedDate: Date;
  fechaI: Date;
  fechaF: Date = new Date;

  fechaActual: Date = new Date();

  constructor(private solicitudEmService: SoliEmpresaService, private router: Router,
    private convenioService: ConvenioService, private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.guardarEmp();
  }

  guardarEmp() {
    this.activatedRoute.params.subscribe(params => {
      let id = params['id']
      console.log(id)
      if (id) {
        this.convenioService.Buscarcon(id).subscribe(
          (data: Convenio) => {
            this.convenio = data
            this.soliempresa.convenio = this.convenio
          }
        )
      }
    });
  }

  Guardarsoli() {

    this.soliempresa.fechaInicioTen = this.fechaI;
    this.soliempresa.fechaMaxTen = this.fechaF;
    this.soliempresa.estado = 1;

    this.solicitudEmService.guardarsolicitud(this.soliempresa).subscribe(
      (data: SolicitudEmpresa) => {
        console.log(data);
        Swal.fire('Solicitud guardado', 'Solicitud Guadada con exito', 'success');
        this.router.navigate(['responsable-empresa/soli/veremp/' + data.id]);
      }, (error) => {
        console.log(error);
        Swal.fire('Error', 'Solicitud no se pudo Guardar', 'error');
      }
    )
  };

}
