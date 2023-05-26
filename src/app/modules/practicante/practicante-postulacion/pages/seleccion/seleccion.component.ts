import { Component, OnInit } from '@angular/core';
import * as pdfFonts from "pdfmake/build/vfs_fonts";
import pdfMake from 'pdfmake';
import { Router } from '@angular/router';
import { Convocatoria } from 'src/app/core/models/convocatoria';
import { ConvocatoriaP } from 'src/app/core/models/convocatoria-p';
import { ConvocatoriaService } from 'src/app/core/services/convocatoria.service';

//import pdfMake from 'pdfmake/build/pdfMake';
// pdfMake.vfs = pdfFonts.pdfMake.vsf; 

@Component({
  selector: 'app-seleccion',
  templateUrl: './seleccion.component.html',
  styleUrls: ['./seleccion.component.css']
})
export class SeleccionComponent implements OnInit {

  convocatorias: ConvocatoriaP[];

  loading: boolean = true;

  constructor(private convocatoriaService: ConvocatoriaService) { }

  private obtenerConvocatoria() {
    this.convocatoriaService.obtenerConvocatoria().subscribe(
      dato => {
        this.convocatorias = dato;
      }
    );
    this.loading = false;
  }

  ngOnInit() {
    this.obtenerConvocatoria();
  }
}






