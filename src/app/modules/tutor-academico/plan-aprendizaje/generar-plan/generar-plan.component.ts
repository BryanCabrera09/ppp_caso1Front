import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import * as pdfMake from 'pdfmake/build/pdfmake';
import * as pdfFonts from 'pdfmake/build/vfs_fonts';
import { FileUpload } from 'src/app/core/interfaces/file';

(pdfMake as any).vfs = pdfFonts.pdfMake.vfs;

@Component({
  selector: 'app-generar-plan',
  templateUrl: './generar-plan.component.html',
  styleUrls: ['./generar-plan.component.css']
})

export class GenerarPlanComponent implements OnInit {

  selectedFile: FileUpload

  practica: any;

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.practica = JSON.parse(params['practica']);
      console.log(this.practica);
      // Use the practica object as needed
    });
  }

  onFileSelected(event: any): void {
    const file: File = event.target.files[0];
    if (file) {
      this.selectedFile = {
        file,
        name: file.name,
        size: file.size,
        type: file.type
      };
    }
  }

  onUpload(): void {
    if (this.selectedFile) {
      // Perform the upload logic here
      console.log('Uploading file:', this.selectedFile);
    }
  }

  generatePDF() {
    const docDefinition = {
      content: [
        {
          table: {
            body: [
              ['Nombre de la empresa formadora', '{{ practica.convocatoria.solicitudEmpresa.convenio.empresa.nombre }}'],
              ['Descripción de la empresa', '{{ practica.convocatoria.solicitudEmpresa.convenio.empresa.mision }}'],
              ['Carrera', '{{ practica.convocatoria.solicitudEmpresa.convenio.carrera.nombre }}'],
              ['Resolución de aprobación ITV', 'SIES-ISTA-0XX-XXXX'],
              ['Número del convenio', `PPP-ISTA-0XX-XXXX: {{ practica.convocatoria.solicitudEmpresa.convenio.numero }}`],
              ['Nombre del estudiante', '{{ practica.estudiante.usuario.nombre }} {{ practica.estudiante.usuario.apellido }}'],
              ['Cédula', '{{ practica.estudiante.usuario.cedula }}'],
              ['Correo', '{{ practica.estudiante.usuario.correo }}']
            ]
          }
        }
      ],
      styles: {
        header: {
          fontSize: 16,
          bold: true,
          margin: [0, 0, 0, 10]
        }
      }
    };
  
    pdfMake.createPdf(docDefinition).download('plan-aprendizaje.pdf');
  }
  

}
