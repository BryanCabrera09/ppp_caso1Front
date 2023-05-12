import { Component, OnInit } from '@angular/core';
import { Actividad } from 'src/app/core/models/actividad';
import { ActividadpService } from 'src/app/core/services/actividadp.service';

@Component({
  selector: 'app-actividad',
  templateUrl: './actividad.component.html',
  styleUrls: ['./actividad.component.css']
})
export class ActividadComponent implements OnInit {

  actividad:Actividad[];

  ngOnInit(): void {
    this.obtenerActividad()
  }

  constructor(private actividadservice:ActividadpService){}

  private obtenerActividad(){
    this.actividadservice.obtenerActividad().subscribe(dato =>{this.actividad=dato;})
  }
  

}
