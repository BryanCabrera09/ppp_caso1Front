import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Estudiante } from 'src/app/core/models/estudiante';
import { Practica } from 'src/app/core/models/practica';
import { TutorAcademico } from 'src/app/core/models/tutor-academicoRS';
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
  practica =new Practica;

  PracticanteList:Estudiante[]=[];
  Practicas:Practica[]=[];

  id: number;
  
  loading: boolean=true;
  usuario: any;
  idUs: any;

  constructor(private practicanteServicio :PracticasService,private userl: TutorAcademicoService, private router:Router){}
  
  ngOnInit() {
    this.tutoruser();
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
        this.pxt()
      }
      )
  }

  pxt(){
    this.practicanteServicio.listarByTistaUsuario(this.tutoraca.id).subscribe(
      practica=>{
        this.Practicas=practica.map(
          resul=>{
            let practicas = new Practica;
            practicas=resul
          }
        )
      }
    )
  }
}
