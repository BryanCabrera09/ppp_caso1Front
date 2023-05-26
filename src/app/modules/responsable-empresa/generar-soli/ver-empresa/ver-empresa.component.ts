import { Component } from '@angular/core';
import * as pdfMake from 'pdfmake/build/pdfmake';
import * as pdfFonts from 'pdfmake/build/vfs_fonts';

pdfMake.vfs = pdfFonts.pdfMake.vfs;

@Component({
  selector: 'app-ver-empresa',
  templateUrl: './ver-empresa.component.html',
  styleUrls: ['./ver-empresa.component.css']
})
export class VerEmpresaComponent {
  actividades: Actividad[] = [];


  agregarActividad() {
    this.actividades.push({ nombre: '', descripcion: '' });
  }

  eliminarActividad(index: number) {
    this.actividades.splice(index, 1);
  }

  guardarActividades() {
    // Aquí puedes realizar cualquier lógica adicional para guardar las actividades,
    // como enviar la lista al servidor o almacenarla en el almacenamiento local.

    // Por ahora, simplemente mostraremos las actividades en la consola.
    console.log(this.actividades);
  }


  generarPDF() {
    const documentDefinition = {
      content: [
        { text: 'Lista de Actividades', style: 'header' },
        { text: ' ', style: 'space' },
        ...this.actividades.map(actividad => {
          return [
            { text: 'Nombre:', style: 'subheader' },
            { text: actividad.nombre },
            { text: 'Descripción:', style: 'subheader' },
            { text: actividad.descripcion },
            { text: ' ', style: 'space' },
          ];
        })
      ],
      styles: {
        header: {
          fontSize: 18,
          bold: true,
          alignment: 'center',
        },
        subheader: {
          fontSize: 14,
          bold: true,
        },
        space: {
          margin: [0, 10, 0, 10],
        },
      },
    };
  
    pdfMake.createPdf(documentDefinition).open();
  }

}

  interface Actividad {
    nombre: string;
    descripcion: string;
  }
