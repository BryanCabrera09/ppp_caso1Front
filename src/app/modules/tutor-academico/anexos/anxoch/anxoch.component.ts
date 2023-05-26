import { Component, OnInit } from '@angular/core';
import * as pdfMake from 'pdfmake/build/pdfmake';
import * as pdfFonts from 'pdfmake/build/vfs_fonts';
import { Practicante } from 'src/app/core/models/practicante';
import { TutorAcademico } from 'src/app/core/models/tutor-academicoRS';
import { TutorEmpresarial } from 'src/app/core/models/tutor-empresarial';

pdfMake.vfs = pdfFonts.pdfMake.vfs;

@Component({
  selector: 'app-anxoch',
  templateUrl: './anxoch.component.html',
  styleUrls: ['./anxoch.component.css']
})
export class AnxochComponent implements OnInit {
  public tutor:TutorAcademico = new TutorAcademico();
  public empresarial:TutorEmpresarial =new TutorEmpresarial();
  public estudiante:Practicante = new Practicante();
  
  constructor() { }
  
  ngOnInit(){
    
  }
  generarPDF() {
    const documentDefinition = {
      content: [
        { text: 'INSTITUTO SUPERIOR UNIVERSITARIO TECNOLÓGICO DEL AZUAY', style: 'header' },
        { text: 'TECNOLOGÍA SUPERIOR EN DESARROLLO DE SOFTWARE', style: 'subheader' },
        { text: 'ANEXO 8: INFORME FINAL DE ACTIVIDADES DE PRÁCTICAS PRE PROFESIONALES', style: 'subheader' },
        ' ',
        { text: 'Cuenca, _______ de _______________ del _________', style: 'date' },
        ' ',
        { text: 'INFORMACIÓN GENERAL', style: 'sectionTitle' },
        ' ',
        { text: 'DATOS GENERALES DE LA EMPRESA / INSTITUCIÓN', style: 'subsectionTitle' },
        'NOMBRE:',
        'UBICACIÓN: (Ciudad y Dirección)',
        'ÁREA O DEPARTAMENTO:',
        ' ',
        { text: 'DATOS DEL TUTOR ESPECÍFICO', style: 'subsectionTitle' },
        'NOMBRE COMPLETO:',
        'CÉDULA DE IDENTIDAD:',
        'CARGO:',
        'TELÉFONO EMPRESA:',
        'CORREO ELECTRÓNICO:',
        ' ',
        { text: 'DATOS DEL ESTUDIANTE', style: 'subsectionTitle' },
        'NOMBRE COMPLETO:',
        'CÉDULA DE IDENTIDAD:',
        'CICLO:',
        'CORREO ELECTRÓNICO:',
        'TELÉFONO:',
        ' ',
        { text: 'DATOS DEL TUTOR ACADÉMICO', style: 'subsectionTitle' },
        'NOMBRE COMPLETO:',
        'CÉDULA DE IDENTIDAD:',
        'CORREO ELECTRÓNICO:',
        ' ',
        { text: 'PERIODO DE DURACIÓN DE LAS ACTIVIDADES DE PRÁCTICAS PREPROFESIONALES', style: 'subsectionTitle' },
        'TIEMPO DE DURACIÓN (Horas):',
        { text: 'FECHA DE INICIO: dd/mm/aaaa', margin: [0, 5, 0, 0] },
        { text: 'FECHA DE FINALIZACIÓN: dd/mm/aaaa', margin: [0, 5, 0, 0] },
        ' ',
        { text: 'DESCRIPCIÓN DE LA EMPRESA/INSTITUCIÓN', style: 'sectionTitle' },
        ' ',
        { text: 'DESCRIPCIÓN DETALLADA DE ACTIVIDADES REALIZADAS', style: 'sectionTitle' },
        ' ',
        'EVIDENCIAS',
        { text: 'Lista y descripción de las evidencias presentadas, debe detallarse por semana', margin: [0, 5, 0, 0] },
        'Semana 1: desde: dd/mm/aaaa  hasta dd/mm/aaaa (Fotografías, capturas de pantalla, informes, diagramas, documentación, etc.)',
        'Semana 2: desde: dd/mm/aaaa  hasta dd/mm/aaaa (Fotografías, capturas de pantalla, informes, diagramas, documentación, etc.)',
        'Semana X: desde: dd/mm/aaaa  hasta dd/mm/aaaa (Fotografías, capturas de pantalla, informes, diagramas, documentación, etc.)',
        ' ',
        { text: 'CONCLUSIONES', style: 'sectionTitle' },
        ' ',
        'FIRMAS Y SELLO.',
        ' ',
        'ESTUDIANTE',
        'TUTOR ACADÉMICO',
        'TUTOR ESPECÍFICO',
        { text: 'Nombres y apellidos.', margin: [0, 10, 0, 0] },
        'Cédula de Identidad.',
        { text: 'Firmas y sellos:', margin: [0, 10, 0, 0] },
      ],
      styles: {
        header: {
          fontSize: 16,
          bold: true,
          alignment: 'center',
          margin: [0, 0, 0, 10]
        },
        subheader: {
          fontSize: 14,
          bold: true,
          margin: [0, 5, 0, 5]
        },
        date: {
          fontSize: 12,
          alignment: 'right',
          margin: [0, 0, 0, 10]
        },
        sectionTitle: {
          fontSize: 14,
          bold: true,
          margin: [0, 10, 0, 5]
        },
        subsectionTitle: {
          fontSize: 12,
          bold: true,
          margin: [0, 5, 0, 0]
        }
      }
    };

    pdfMake.createPdf(documentDefinition).open();
  }



}
