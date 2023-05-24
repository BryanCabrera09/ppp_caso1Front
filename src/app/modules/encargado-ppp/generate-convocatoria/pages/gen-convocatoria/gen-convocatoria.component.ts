import { Component, OnInit } from '@angular/core';
import { SolicitudEmpresa } from 'src/app/core/models/solicitud-empresa';
import { SoliEmpresaService } from 'src/app/core/services/soli-empresa.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-gen-convocatoria',
  templateUrl: './gen-convocatoria.component.html',
  styleUrls: ['./gen-convocatoria.component.css']
})
export class GenConvocatoriaComponent implements OnInit{

  soliE: SolicitudEmpresa[]=[]
  loading: boolean = true;
  id: number = 0
  idform:number

  ngOnInit(): void {
    this.soliEmpresaService.ListarSoli().subscribe(
      soli=> {
        this.soliE = soli.map(
          result=>{
            let soli = new SolicitudEmpresa
            soli.id = result.id
           soli.fechaInicioTen= result.fechaInicioTen
           soli.fechaMaxTen = result.fechaMaxTen
           soli.numPracticantes = result.numPracticantes
            soli.numHoras = result.numHoras
           soli.estado = result.estado
           soli.convenio = result.convenio
           soli.actividad = result.actividad
           this.id = result.id
           return soli;
          }
        )
        this.loading = false;
      }
    );

    localStorage.removeItem('IdSoli')
  }

  constructor(private soliEmpresaService: SoliEmpresaService, private router: Router){}

  capturarid(id: any){
    
    this.idform = id
    //localStorage.setItem('IdSoli', JSON.stringify(id));
    this.router.navigate(['/encargado-practicas/convocatoria/form/'+this.idform]);
  }
}
