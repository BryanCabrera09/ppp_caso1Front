import { Component, OnInit } from '@angular/core';
import { SolicitudEmpresa } from 'src/app/core/models/solicitud-empresa';
import { SoliEmpresaService } from 'src/app/core/services/soli-empresa.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-gen-convocatoria',
  templateUrl: './gen-convocatoria.component.html',
  styleUrls: ['./gen-convocatoria.component.css']
})
export class GenConvocatoriaComponent implements OnInit {

  solicitudes: SolicitudEmpresa[] = [];

  loading: boolean = true;
  idform: number;

  ngOnInit(): void {
    this.soliEmpresaService.ListarSoli().subscribe(
      soli => {
        this.solicitudes = soli;
      }
    );
    this.loading = false;
  }

  constructor(private soliEmpresaService: SoliEmpresaService, private router: Router) { }

  capturarid(id: any) {

    this.idform = id
    this.router.navigate(['/encargado-practicas/convocatoria/form/' + this.idform]);
  }
}
