import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Estudiante } from 'src/app/core/models/estudiante';
import { Usuario } from 'src/app/core/models/usuario';
import { Visita } from 'src/app/core/models/visita';
import { VisitaActividad } from 'src/app/core/models/visita-actividad';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {

  acvisita = new VisitaActividad;
  visita = new Visita;
  estudiante = new Estudiante;
  practica: any;

  user: Usuario;

  constructor(private route: ActivatedRoute, private acvisitaService: VisitaActividad, private visitaService: Visita) { }

  ngOnInit() {
    this.user = JSON.parse(sessionStorage.getItem('userdetails') || "");
    this.route.queryParams.subscribe(params => {
      this.practica = JSON.parse(params['practica']);
      console.log("practica: " + this.practica);
      this.estudiante = this.practica.estudiante;
      console.log(this.estudiante)
      console.log(this.practica);
    });
  }
}
