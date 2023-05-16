import { Component, OnInit } from '@angular/core';
import { SolicitudEmpresa } from 'src/app/core/models/solicitud-empresa';
import { SoliEmpresaService } from 'src/app/core/services/soli-empresa.service';

@Component({
  selector: 'app-gen-convocatoria',
  templateUrl: './gen-convocatoria.component.html',
  styleUrls: ['./gen-convocatoria.component.css']
})
export class GenConvocatoriaComponent implements OnInit{

  soliE: SolicitudEmpresa[]=[]


  ngOnInit(): void {
    this.soliEmpresaService.ListarSoli().subscribe(
      sol=> this.soliE = sol
    );
  }

  constructor(private soliEmpresaService: SoliEmpresaService){}

}
