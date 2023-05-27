import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Calificacion } from 'src/app/core/models/calificacion';
import { Usuario } from 'src/app/core/models/usuario';
import { CalificacionService } from 'src/app/core/services/calificacion.service';
import { PracticaService } from 'src/app/core/services/practica.service';

@Component({
  selector: 'app-practicas-tutor',
  templateUrl: './practicas-tutor.component.html',
  styleUrls: ['./practicas-tutor.component.css']
})
export class PracticasTutorComponent {

  user = new Usuario();
  practicas: any[] = [];
  calificaciones: Calificacion[] = [];
  calificacion: Calificacion;

  constructor(private practicaService: PracticaService, private router: Router,
    private calfService: CalificacionService) {}

  ngOnInit(): void {
    this.user = JSON.parse(sessionStorage.getItem('userdetails') || "");
    this.listPracticas()
  }

  listPracticas() {
    this.practicaService.listarByTistaUsuario(this.user.id).subscribe(
      (response) => {
        this.practicas = response.body;
        console.log("Lista de practicas: " + this.practicas);
        for(let p of this.practicas) {
          this.listarCalificaciones(p.id);
        }
      }
    );
  }

  listarCalificaciones(id: number) {
    this.calfService.listbyPractica(id).subscribe(
      (data) => {
        this.calificaciones = data;
        this.comparar(this.practicas, this.calificaciones)
        console.log(this.calificacion)
        //this.comparar(this.practicas, this.calificaciones)
      }
    )
  }

  comparar(practicas: any[], calificaciones: Calificacion[]) {
    for (let calificacion of calificaciones) {
      const practicaId = calificacion.practica.id
      
      // Buscar la práctica correspondiente utilizando el practicaId
      const practica = practicas.find(p => p.id === practicaId);

      if (practica && calificacion.tutor == 1) {
        // Se encontró una práctica correspondiente
        // Puedes realizar la comparación y operaciones necesarias aquí
        practica.calificacion = calificacion;
        console.log(practica)
      }
    }
  }

}
