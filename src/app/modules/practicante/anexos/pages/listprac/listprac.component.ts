import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Calificacion } from 'src/app/core/models/calificacion';
import { Estudiante } from 'src/app/core/models/estudiante';
import { Practica } from 'src/app/core/models/practica';
import { TutorAcademico } from 'src/app/core/models/tutor-academicoRS';
import { Usuario } from 'src/app/core/models/usuario';
import { EstudianteService } from 'src/app/core/services/estudiante.service';
import { PracticasService } from 'src/app/core/services/practicas.service';
import { TutorAcademicoService } from 'src/app/core/services/tutor-academico.service';

@Component({
  selector: 'app-listprac',
  templateUrl: './listprac.component.html',
  styleUrls: ['./listprac.component.css']
})
export class ListpracComponent implements OnInit{
  practicantes= new Estudiante;
  tutoraca =new TutorAcademico;

  estudianteId: number;
  estudiante = new Estudiante;
  practica = new Practica;
  usuario = new Usuario;

  calificacion = new Calificacion;

  calificaciones: Calificacion[];

  PracticanteList:Estudiante[]=[];
  Practicas:Practica[]=[];

  id: number;
  
  loading: boolean=true;
  idUs: any;

  constructor(private practicanteServicio :PracticasService,private userl: TutorAcademicoService, private router:Router, private estudianteService: EstudianteService){}
  
  ngOnInit() {
    this.tutoruser();
    this.buscarEstudiante();
  }

  traerid(id : any) {
    this.id = id
    this.router.navigate(['tutor-academico/anexos/anexocho/' + this.id]);
  }

  tutoruser(){
    this.usuario = JSON.parse(sessionStorage.getItem('userdetails')!);
    this.idUs = this.usuario.id;
    this.userl.buscarxusuario(this.idUs).subscribe(
      (data:TutorAcademico) => {
        this.tutoraca.id=data.id;
        
      }
      )
  }


  buscarEstudiante() {
    // Obtener el estudiante por ID de usuario
    this.usuario = JSON.parse(sessionStorage.getItem('userdetails')!);
    this.idUs = this.usuario.id;
    console.log(this.idUs)

    // Reemplazar con el ID de usuario correspondiente
    this.estudianteService.buscarxUsuario(this.idUs).subscribe(
      (data: Estudiante) => {
        this.estudiante = data;
        this.estudiante.id = data.id;
        this.buscarPracticas();
      },
      (error) => {
        console.error(error);
      }
    );
  }

  buscarPracticas() {
    // Obtener las prácticas del estudiante por su ID
    this.practicanteServicio.buscarxEstudiante(this.estudiante.id).subscribe(
      (data: Practica) => {
        this.practica = data;
        this.practica.id = data.id;
        
      },
      (error) => {
        console.error(error);
      }
    );
    this.loading = false;
  }

}