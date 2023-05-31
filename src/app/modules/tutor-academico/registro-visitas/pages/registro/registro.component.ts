import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Actividad } from 'src/app/core/models/actividad';
import { Estudiante } from 'src/app/core/models/estudiante';
import { Usuario } from 'src/app/core/models/usuario';
import { Visita } from 'src/app/core/models/visita';
import { VisitaActividad } from 'src/app/core/models/visita-actividad';
import { VisitaActividadService } from 'src/app/core/services/visita-actividad.service';
import { VisitaService } from 'src/app/core/services/visita.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {

  estudiante = new Estudiante;
 
  visitaO:Visita =new Visita;
  practica: any;
  semana:number;
  user: Usuario;
  visitaa:VisitaActividad =new VisitaActividad;
  visitaA: any[] =[];
  formulario?: FormGroup;

  

  constructor(private route: ActivatedRoute, private visitaservice :VisitaService ,
    private visitaactividadservice: VisitaActividadService,private fb: FormBuilder) { }

  ngOnInit() {
    this.user = JSON.parse(sessionStorage.getItem('userdetails') || "");
    this.route.queryParams.subscribe(params => {
      this.practica = JSON.parse(params['practica']);
      console.log("practica: " + this.practica);
      this.estudiante = this.practica.estudiante;
      console.log(this.estudiante)
      console.log(this.practica);
      this.buscarvisita(this.practica.id)
      this.startForm();
    });

   
  }

  buscarvisita(id :number){
    this.visitaservice.buscarVisita(id).subscribe(
      dato => {

      this.semana=dato.semana

      },
      error=>{
        this.semana=1
      }
    )
  }
  guardarvisitaactividad(){

    this.visitaO.asunto = "Visita de seguimiento y observación del proceso de prácticas pre profesionales.Visita de seguimiento y observación del proceso de prácticas pre profesionales."
    console.log(this.visitaO)
    this.visitaO.practica=this.practica
    this.visitaO.semana= this.semana
    this.visitaservice.createVisita(this.visitaO).subscribe(dato=>{
     console.log(dato)
    for(let v of this.visitaA){
    
      v.visita = dato
     this.visitaactividadservice.createVisitaA(v).subscribe(
      res=>{
        console.log(res)
      }
     )
    }
 
   })
 
}

agregarvisitaactividad(){

  this.visitaA.push(this.visitaa);
  console.log(this.visitaA)
  this.visitaa= new VisitaActividad
}



startForm() {
  this.formulario = this.fb.group({
    actividad: ['',Validators.required],
    observacion: ['', Validators.required],
    observaciong: ['', Validators.required],

  });
}

markAllFieldsAsTouched() {
  Object.values(this.formulario.controls).forEach(control => {
    control.markAsTouched();
  });
}

isInvalid(controlName: string): boolean {
  const control = this.formulario.get(controlName);
  return control?.invalid && control?.touched;
}



}