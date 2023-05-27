import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import * as pdfMake from 'pdfmake/build/pdfmake';
import * as pdfFonts from 'pdfmake/build/vfs_fonts';
import { PracticasService } from 'src/app/core/services/practicas.service';

(pdfMake as any).vfs = pdfFonts.pdfMake.vfs;

@Component({
  selector: 'app-generar-plan',
  templateUrl: './generar-plan.component.html',
  styleUrls: ['./generar-plan.component.css']
})
export class GenerarPlanComponent implements OnInit {

  numeroSemanas: number;
  semanas: number[] = [];
  mostrarTabla: boolean = false;

  cargarSemanas() {
    this.semanas = []; // Restablecer el arreglo semanas
    if (this.numeroSemanas === 6 || this.numeroSemanas === 12) {
      for (let i = 1; i <= this.numeroSemanas; i++) {
        this.semanas.push(i);
      }
      this.mostrarTabla = true; // Mostrar la tabla
    }
  }

  practica: any;

  constructor(private route: ActivatedRoute, private pracServ: PracticasService) { }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.practica = JSON.parse(params['practica']);
      console.log(this.practica);
    });
  }

  guardar() {
    this.pracServ.editarPractica(this.practica.id, this.practica).subscribe(
      (res) => {
        console.log(res);
      }
    )
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

    pdfMake.createPdf(docDefinition).download('practica.pdf');
  }


}
