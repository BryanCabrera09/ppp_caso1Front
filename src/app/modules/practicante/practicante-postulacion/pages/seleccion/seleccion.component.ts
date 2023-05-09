import { Component, OnInit } from '@angular/core';
import pdfMake from 'pdfmake/build/pdfMake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
pdfMake.vfs = pdfFonts.pdfMake.vsf;

@Component({
  selector: 'app-seleccion',
  templateUrl: './seleccion.component.html',
  styleUrls: ['./seleccion.component.css']
})
export class SeleccionComponent implements OnInit {
  
  ngOnInit() {
  }

  createPDF(){
    const pdfDefinition: any ={
    content:[
      {
        text:'hola mundo'
      }
    ]
  }
  const pdf= pdfMake.createPDF(pdfDefinition);
  pdf.open();
  }
}


 



