import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute} from '@angular/router';
import { Actividad } from 'src/app/core/models/actividad';
import { ConvocatoriaP } from 'src/app/core/models/convocatoria-p';
import { SolicitudEmpresa } from 'src/app/core/models/solicitud-empresa';
import { ActividadpService } from 'src/app/core/services/actividadp.service';
import { ConvocatoriaService } from 'src/app/core/services/convocatoria.service';

@Component({
  selector: 'app-vista',
  templateUrl: './vista.component.html',
  styleUrls: ['./vista.component.css']
})
export class VistaComponent implements OnInit {

  convocatoriap:ConvocatoriaP[];
  actividades:Actividad[];
  actividad:Actividad;
  solicitudempresa:SolicitudEmpresa;

  constructor(private convocatoriaService:ConvocatoriaService,
    private actividadservice:ActividadpService,private route: ActivatedRoute){}
  
 

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.solicitudempresa = JSON.parse(params['solicitudempresa']);
      console.log(this.solicitudempresa);
      this.obtenerActividadid(this.solicitudempresa.id)
    });
 this.obtenerConvocatoria();

  }

  private obtenerConvocatoria(){
    this.convocatoriaService.obtenerConvocatoria().subscribe(dato =>{this.convocatoriap=dato;})
  }


  obtenerActividadid(id : number) {
  
    this.actividadservice.obtenerActividadid(id).subscribe( 
      (data)=>{
        this.actividades=data;
        console.log(this.actividades);
        this.actividad=this.actividades[0];
        console.log("actividad"+this.actividad)
      }
    )
  
  }


 


}
