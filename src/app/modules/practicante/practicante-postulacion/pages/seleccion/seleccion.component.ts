import { Component, OnInit } from '@angular/core';
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

  ngOnInit() {
    this.obtenerConvocatoria();
  }

  private obtenerConvocatoria() {
    this.convocatoriaService.obtenerConvocatoria().subscribe(
      dato => {
        const fechaActual = new Date();
        this.convocatorias = dato.filter(convocatoria => new Date(convocatoria.fechaFin) >= fechaActual);
        //this.convocatorias = dato;
      }
    );
    this.loading = false;
  }
}






