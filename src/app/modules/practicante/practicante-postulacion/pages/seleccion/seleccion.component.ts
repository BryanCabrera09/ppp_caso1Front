import { Component, OnInit } from '@angular/core';
import * as pdfFonts from "pdfmake/build/vfs_fonts";
import pdfMake from 'pdfmake';
import { Router } from '@angular/router';
import { Convocatoria } from 'src/app/core/models/convocatoria';
import { ConvocatoriaService } from 'src/app/core/services/convocatoria.service';
import { ConvocatoriaP } from 'src/app/core/models/convocatoria-p';


@Component({
  selector: 'app-seleccion',
  templateUrl: './seleccion.component.html',
  styleUrls: ['./seleccion.component.css']
})
export class SeleccionComponent implements OnInit {

  convocatoria:Convocatoria[];
  convocatoriap:ConvocatoriaP[];
  

  constructor(private convocatoriaService:ConvocatoriaService,private router:Router){}

  
  
  private obtenerConvocatoria(){
    this.convocatoriaService.obtenerConvocatoria().subscribe(dato =>{this.convocatoriap=dato;})
  }

  navegar(){
    this.router.navigate(['practicante/postulacion/vista'])
  }
 
  ngOnInit() {
    this.obtenerConvocatoria();
  }

 

}


 



