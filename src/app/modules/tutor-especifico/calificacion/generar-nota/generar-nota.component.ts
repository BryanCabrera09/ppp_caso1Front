import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Calificacion } from 'src/app/core/models/calificacion';
import { Usuario } from 'src/app/core/models/usuario';
import { CalificacionService } from 'src/app/core/services/calificacion.service';
import Swal from 'sweetalert2';

import * as pdfMake from 'pdfmake/build/pdfmake';
import * as pdfFonts from 'pdfmake/build/vfs_fonts';

@Component({
  selector: 'app-generar-nota',
  templateUrl: './generar-nota.component.html',
  styleUrls: ['./generar-nota.component.css']
})
export class GenerarNotaComponent implements OnInit {

  user: Usuario;
  practica: any;
  calificacion: Calificacion = new Calificacion();
  suma: number;

  constructor(private route: ActivatedRoute, private calificacionService: CalificacionService,
    private router: Router) { }

  ngOnInit() {
    this.user = JSON.parse(sessionStorage.getItem('userdetails') || "");
    this.route.queryParams.subscribe(params => {
      this.practica = JSON.parse(params['practica']);
      console.log(this.practica);
    });
  }

  selectedCell: { [key: string]: number } = {};
  selectedValues: Map<string, number> = new Map<string, number>();

  toggleCheck(rowKey: string, colIndex: number) {
    if (this.selectedCell[rowKey] === colIndex) {
      delete this.selectedCell[rowKey];
      this.selectedValues.delete(rowKey);
    } else {
      this.selectedCell[rowKey] = colIndex;
      const value = this.getCellValue(rowKey, colIndex);
      console.log('Valor seleccionado:', value);
      this.selectedValues.set(rowKey, value);
      console.log(this.selectedValues)
    }
  }

  getCellValue(rowKey: string, colIndex: number): number {
    const values: { [key: string]: number[] } = {
      a: [20, 15, 10, 5, 1],
      b: [20, 15, 10, 5, 1],
      c: [20, 15, 10, 5, 1],
      d: [20, 15, 10, 5, 1],
      e: [20, 15, 10, 5, 1]
    };
    return values[rowKey][colIndex];
  }

  calcularSuma(): number {
    this.suma = 0;
    this.selectedValues.forEach(value => {
      this.suma += value;
    });
    return this.suma;
  }

  guardar() {
    if (this.selectedValues.has("a") && this.selectedValues.has("b")
      && this.selectedValues.has("c") && this.selectedValues.has("d")
      && this.selectedValues.has("e") && this.suma > 0) {
      this.calificacion.a = this.selectedValues.get("a");
      this.calificacion.b = this.selectedValues.get('b');
      this.calificacion.c = this.selectedValues.get('c');
      this.calificacion.d = this.selectedValues.get('d');
      this.calificacion.e = this.selectedValues.get('e');
      this.calificacion.total = this.suma;
      this.calificacion.tutor = 2;
      this.calificacion.practica = this.practica;
      console.log(this.calificacion);
      this.calificacionService.saveGrade(this.calificacion).subscribe(
        (res) => {
          Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'La calificacón ha sido guardada',
            showConfirmButton: false,
            timer: 1500
          });
          this.calificacion = res;
          this.generarPDF();
          this.router.navigate(['../tutor-especifico/calificacion/practica-tutor']);
        },
        (error) => {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Ya se ha generado una calificación por: ' + this.user.apellido + ', ' + this.user.nombre
          })
        }

      )
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Se debe seleccionar un valor por parámetro!',
      })
    }
  }

  generarPDF() {
    //Logo Ista 

    pdfMake.vfs = pdfFonts.pdfMake.vfs
    const documentDefinition = {
      pageSize: 'A4',
      content: [
        {
          text: 'Evaluación de prácticas pre profesionales tutor específico',
          style: 'header'
        },
        {
          text: 'Información del estudiante',
          style: 'subheader'
        },
        {
          table: {
            body: [
              ['Cedula de identidad del estudiante', this.practica.estudiante.usuario.cedula],
              ['Nombre del estudiante', this.practica.estudiante.usuario.nombre + ' ' + this.practica.estudiante.usuario.apellido],
              ['Empresa', this.practica.convocatoria.solicitudEmpresa.convenio.empresa.nombre],
              ['Carrera', this.practica.convocatoria.solicitudEmpresa.convenio.carrera.nombre],
              ['Período de tiempo de realización de prácticas pre profesionales', 'Desde: ' + this.practica.inicio + ' Hasta: ' + this.practica.fin]
            ]
          }
        },
        // Resto del contenido del PDF...
        {
          styles: {
            // ...
            cellStyle: {
              alignment: 'center' // Aplicar centrado al texto de las celdas
            }
          },
          table: {
            headerRows: 1, // Número de filas que actuarán como encabezado
            body: [
              ['PARÁMETROS', '20', '15', '10', '5', '1'],
              ['a) Asistencia y Puntualidad.', 
                {text: this.cel1(this.calificacion.a)}, {text: this.cel2(this.calificacion.a)}, {text: this.cel3(this.calificacion.a)}, {text: this.cel4(this.calificacion.a)}, {text: this.cel5(this.calificacion.a)}],
              ['b) Cumplimiento de normas establecidas por la entidad receptora.', 
                {text: this.cel1(this.calificacion.b)}, {text: this.cel2(this.calificacion.b)}, {text: this.cel3(this.calificacion.b)}, {text: this.cel4(this.calificacion.b)}, {text: this.cel5(this.calificacion.b)}],
              ['c) Compromiso y responsabilidad frente al trabajo.', 
                {text: this.cel1(this.calificacion.c)}, {text: this.cel2(this.calificacion.c)}, {text: this.cel3(this.calificacion.c)}, {text: this.cel4(this.calificacion.c)}, {text: this.cel5(this.calificacion.c)}],
              ['d) Integración y actitud de colaboración con los miembros del equipo de la empresa.', 
                {text: this.cel1(this.calificacion.d)}, {text: this.cel2(this.calificacion.d)}, {text: this.cel3(this.calificacion.d)}, {text: this.cel4(this.calificacion.d)}, {text: this.cel5(this.calificacion.d)}],
              ['d) Integración y actitud de colaboración con los miembros del equipo de la empresa.', 
                {text: this.cel1(this.calificacion.e)}, {text: this.cel2(this.calificacion.e)}, {text: this.cel3(this.calificacion.e)}, {text: this.cel4(this.calificacion.e)}, {text: this.cel5(this.calificacion.e)}],
            ]
          },        
        },
        {
          text: 'PUNTAJE TOTAL: ' + this.calificacion.total ,
          style: 'footer'
        },
        {
          text: 'NÚMERO DE HORAS TOTAL: ' + this.practica.convocatoria.solicitudEmpresa.numHoras,
          style: 'footer'
        },
        {
          canvas: [
            {
              type: 'line',
              x1: 0,
              y1: 0,
              x2: 500,
              y2: 0,
              lineWidth: 1
            }
          ]
        },
        // Texto encima de la línea
        {
          stack: [
            {
              text: this.user.nombre + ' ' + this.user.apellido,
              style: 'textAboveLine'
            }
          ]
        },
      
        // Texto debajo de la línea
        {
          stack: [
            {
              text: 'Tutor Específico',
              style: 'textBelowLine'
            }
          ]
        }
        
      ],
      styles: {
        header: {
          fontSize: 18,
          bold: true,
          margin: [0, 0, 0, 10]
        },
        subheader: {
          fontSize: 14,
          bold: true,
          margin: [0, 10, 0, 5]
        },
        footer: {
          alignment: 'right',
          margin: [0, 10, 0, 0],
        },
        // Estilos adicionales que necesites...
        textAboveLine: {
          margin: [0, 10, 0, 0],
          fontSize: 12,
          alignment: 'center'
        },
        textBelowLine: {
          margin: [0, 0, 0, 10],
          fontSize: 12,
          alignment: 'center'
        }
      }
    };

    pdfMake.createPdf(documentDefinition).download('evaluacion.pdf');
  }

  cel1(nota) {
    if (nota == 20) {
      return '✓';
    }
    return ''; // Valor por defecto si no se cumple ninguna condición
  }
  cel2(nota) {
    if (nota == 15) {
      return '✓';
    }
    return ''; // Valor por defecto si no se cumple ninguna condición
  }
  cel3(nota) {
    if (nota == 10) {
      return '✓';
    }
    return ''; // Valor por defecto si no se cumple ninguna condición
  }
  cel4(nota) {
    if (nota == 5) {
      return '✓';
    }
    return ''; // Valor por defecto si no se cumple ninguna condición
  }
  cel5(nota) {
    if (nota == 1) {
      return '✓';
    }
    return ''; // Valor por defecto si no se cumple ninguna condición
  }

}
