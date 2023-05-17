import { Component } from '@angular/core';
import { Actividad } from 'src/app/core/models/actividad';
import { Empresa } from 'src/app/core/models/empresa';
import { SolicitudEmpresa } from 'src/app/core/models/solicitud-empresa';

@Component({
  selector: 'app-aceptacion-solicitud',
  templateUrl: './aceptacion-solicitud.component.html',
  styleUrls: ['./aceptacion-solicitud.component.css']
})
export class AceptacionSolicitudComponent {

  empresas: Empresa[];
  actividades: Actividad[];

  solicitudEmpre: SolicitudEmpresa;
  empresa = new Empresa();

  loading: boolean = true;
  displayEU: boolean = false;

  editarEmpresa(empresa: Empresa) {

    this.displayEU = true;

    /* this.practestudiant.cedula = practicante.cedula; */
  }

}
