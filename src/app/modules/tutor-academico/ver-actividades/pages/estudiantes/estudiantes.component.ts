import { Component, OnInit } from '@angular/core';
import { Estudiante } from 'src/app/core/models/estudiante';
import { TutorAcademico } from 'src/app/core/models/tutor-academicoRS';
import { EstudianteService } from 'src/app/core/services/estudiante.service';
import { TutorAcademicoService } from 'src/app/core/services/tutor-academico.service';
import { TutorAcademicoModule } from '../../../tutor-academico.module';
import { PracticaService } from 'src/app/core/services/practica.service';
import { PracticasService } from 'src/app/core/services/practicas.service';
import { Practica } from 'src/app/core/models/practica';
import { Router } from '@angular/router';

@Component({
  selector: 'app-estudiantes',
  templateUrl: './estudiantes.component.html',
  styleUrls: ['./estudiantes.component.css']
})
export class EstudiantesComponent implements OnInit {
  usuario: any;
  idUs: number;
  estudiante = new Estudiante;
  pract: Practica[] =[]
  practicas = new Practica
  tutor = new TutorAcademico
  idn: number
  ngOnInit(): void {
    this.listPracticas()
  }

  constructor(private tutroService: TutorAcademicoService, private estudianteService: EstudianteService,
    private practicaServic: PracticasService, private router: Router) { }

 
  listPracticas() {
    this.usuario = JSON.parse(sessionStorage.getItem('userdetails')!);
    this.idUs = this.usuario.id;
    this.practicaServic.listarByTistaUsuario(this.idUs).subscribe(
      (response) => {
        this.pract = response.body;
        this.practicas.estudiante.id
        console.log("Lista de practicas: " + this.practicas);
      }
    );
  }

  traerid(id:any){
    this.idn = id
    this.router.navigate(['/tutor-academico/ver/actividades' + this.idn]);
  }

}
