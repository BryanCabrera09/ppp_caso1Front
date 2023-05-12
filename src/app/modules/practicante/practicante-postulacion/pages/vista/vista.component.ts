import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute} from '@angular/router';
import { Actividad } from 'src/app/core/models/actividad';
import { ConvocatoriaP } from 'src/app/core/models/convocatoria-p';
import { ActividadpService } from 'src/app/core/services/actividadp.service';
import { ConvocatoriaService } from 'src/app/core/services/convocatoria.service';

@Component({
  selector: 'app-vista',
  templateUrl: './vista.component.html',
  styleUrls: ['./vista.component.css']
})
export class VistaComponent implements OnInit {

  convocatoriap:ConvocatoriaP[];
  actividad:Actividad[];

  constructor(private convocatoriaService:ConvocatoriaService,
    private actividadservice:ActividadpService,private activatedRoute: ActivatedRoute){}
  
 

  ngOnInit(): void {
 this.obtenerConvocatoria();
this.obtenerActividadid();
  }

  private obtenerConvocatoria(){
    this.convocatoriaService.obtenerConvocatoria().subscribe(dato =>{this.convocatoriap=dato;})
  }


  obtenerActividadid() {
    this.activatedRoute.params.subscribe(params => {
      let id = params['id']
      if (id) {
        this.actividadservice.obtenerActividadid(id).subscribe(dato =>{this.actividad=dato;})
        console.log(this.actividad)
        console.log(this.actividad)
      }
    })
  }


 


}
