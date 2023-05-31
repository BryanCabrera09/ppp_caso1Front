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

import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';

(pdfMake as any).vfs = pdfFonts.pdfMake.vfs;
(pdfMake as any).defaultConfig = {
  defaultStyle: {
    font: 'times'
  }
};


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
    Swal.fire('Solicitud guardado', 'Solicitud Guadada con exito', 'success');
 
   })
 
}

agregarvisitaactividad(){


  this.visitaA.push(this.visitaa);
  console.log(this.visitaA)
  this.visitaa= new VisitaActividad
}



 




generarPDF() {

  pdfMake.vfs = pdfFonts.pdfMake.vfs
  // Crear los datos para las tablas
  const dataTabla1 = [
    ['Columna 1', 'Columna 2'],
    ['Dato 1', 'Dato 2' ],
    ['Dato 4', 'Dato 5', ]
  ]

  const dataTabla2 = [
    ['Columna A', 'Columna B'],
    ['Info A1', 'Info B1'],
    ['Info A2', 'Info B2']
  ];

  // Definir las configuraciones de las tablas
  const table1 = {
    table: {
      body: dataTabla1
    }
  };

  const table2 = {
    table: {
      body: dataTabla2
    }
  };

  // Crear el documento PDF
  const documentDefinition = {
    content: [
      {
        text: 'INSTITUTO SUPERIOR UNIVERSITARIO TECNOLÓGICO DEL AZUAY',
        style: 'header'
      },
      {
        text: 'TECNOLOGÍA SUPERIOR EN DESARROLLO DE SOFTWARE',
        style: 'header'
      },
      {
        text: 'ANEXO 5\nREGISTRO DE VISITA A EMPRESA FORMADORA RECEPTORA',
        style: 'subheader',
        margin: [0, 20, 0, 10]
      },
      { text: 'Tabla 1', style: 'tableHeader' },
      table1,
      { text: 'Tabla 2', style: 'tableHeader' },
      table2
    ],
    styles: {
      header: {
        fontSize: 16,
        bold: true,
        alignment: 'center',
        margin: [0, 10, 0, 0],
    
      },
      subheader: {
        fontSize: 14,
        bold: true,
        alignment: 'center',
        margin: [0, 0, 0, 10],
   
      },
      tableHeader: {
        bold: true,
        fontSize: 12,
        color: 'black',
        alignment: 'center',
        
      }
    }
  };
  

  // Generar el PDF y abrirlo en una nueva pestaña del navegador
  pdfMake.createPdf(documentDefinition).download('evaluacion.pdf');
}


}