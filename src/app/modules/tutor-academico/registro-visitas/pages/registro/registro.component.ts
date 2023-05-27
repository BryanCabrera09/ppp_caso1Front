import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Estudiante } from 'src/app/core/models/estudiante';
import { Visita } from 'src/app/core/models/visita';
import { VisitaActividad } from 'src/app/core/models/visita-actividad';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit{
  
  acvisita= new VisitaActividad
  visita=new Visita
  estudiante= new Estudiante
  practica: any;
  

  constructor(private route: ActivatedRoute,private acvisitaservice : VisitaActividad
    , private visitaservice :Visita) { }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.practica = JSON.parse(params['practica']);
      this.estudiante=this.practica.estudiante;
      console.log(this.estudiante)
      console.log(this.practica);
    });
  }


   
}
