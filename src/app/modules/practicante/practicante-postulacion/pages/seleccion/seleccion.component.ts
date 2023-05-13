import { Component, OnInit } from '@angular/core';
import * as pdfFonts from "pdfmake/build/vfs_fonts";
import pdfMake from 'pdfmake';
import { Router } from '@angular/router';
import { Convocatoria } from 'src/app/core/models/convocatoria';
import { ConvocatoriaService } from './convocatoria.service';
import { ConvocatoriaP } from 'src/app/core/models/convocatoria-p';

//import pdfMake from 'pdfmake/build/pdfMake';
// pdfMake.vfs = pdfFonts.pdfMake.vsf;

@Component({
  selector: 'app-seleccion',
  templateUrl: './seleccion.component.html',
  styleUrls: ['./seleccion.component.css']
})
export class SeleccionComponent implements OnInit {

  convocatoria: Convocatoria[];
  convocatoriap: ConvocatoriaP[];

  constructor(private convocatoriaService: ConvocatoriaService) { }

  private obtenerConvocatoria() {
    this.convocatoriaService.obtenerConvocatoria().subscribe(dato => { this.convocatoriap = dato; })
  }

  ngOnInit() {
    this.obtenerConvocatoria();
  }

  createPdf() {
    const pdfDefinition: any = {
      content: [
        {
          text: 'hola mundo'
        }
      ]
    }

    const pdf = pdfMake.createPdf(pdfDefinition);
    pdf.open();
  }


  // const pdf= pdfMake.createPDF(pdfDefinition);
  // pdf.open();
}






