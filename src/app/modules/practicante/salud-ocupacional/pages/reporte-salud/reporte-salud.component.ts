import { Component } from '@angular/core';
import { PdfMakeWrapper, Txt, Table, Cell } from 'pdfmake-wrapper';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-reporte-salud',
  templateUrl: './reporte-salud.component.html',
  styleUrls: ['./reporte-salud.component.css']
})
export class ReporteSaludComponent {
  

    generatePDF() {
      // Crear un objeto PdfMakeWrapper
      const pdf = new PdfMakeWrapper();
  
      // Definir el contenido del documento
      pdf.add(
        new Txt('ANEXO 3: CONSTANCIA DE INDUCCIÓN EN SALUD OCUPACIONAL Y ENTREGA DE EQUIPOS DE PROTECCIÓN PERSONAL (EPP)').bold().fontSize(14).alignment('center').end
      );
      pdf.add('\n');
      pdf.add(
        new Txt('Yo (Nombres y apellidos del estudiante), con cedula de identidad (Número de cedula del estudiante), estudiante del quinto ciclo paralelo A del periodo académico: mayo – octubre 2022  de la carrera de Tecnología Superior en Desarrollo de Software, doy a conocer que en la empresa formadora NOMBRE EMPRESA XXXXXX, he recibido los siguientes aspectos en lo referente a medidas de seguridad industrial y prevención de riesgos dentro de la empresa:').fontSize(12).alignment('justify').end
      );
      pdf.add('\n');
      pdf.add(
        new Table([
          ['ASPECTOS', 'SI', 'NO', 'OBSERVACIONES'],
          ['Charla informativa sobre las medidas de seguridad industrial de la empresa y prevención de riesgos laborales.', 'X', '', ''],
          ['Se realiza una charla informativa de prevención de riesgos laborales.', '', '', ''],
          ['Socialización del reglamento de seguridad industrial.', '', 'X', ''],
          ['Por la actividad que realiza la empresa, no presenta riesgos de seguridad industrial', '', '', ''],
          ['He recibido el equipo de protección personal mínimo establecido por la empresa.', 'X', '', ''],
          ['He adquirido el equipo mínimo de seguridad industrial establecido por la empresa.', 'X', '', '']
        ]).layout('lightHorizontalLines').end
      );
      pdf.add('\n');
      pdf.add(
        new Txt('Para constancia firma:').fontSize(12).alignment('justify').end
      );
      pdf.add('\n');
      
      
  
      // Generar el PDF y abrirlo en una nueva ventana
      pdf.create().open();
    }
    preguntas: string[] = [
      '1. Ha recibido una charla informativa sobre las medidas de seguridad industrial de la empresa y prevención de riesgos laborales?',
      '2. Ha recibido una socialización del reglamento de seguridad industrial?',
      '3. Ha recibido el equipo de protección personal mínimo establecido por la empresa?',
      '4. Ha adquirido el equipo mínimo de seguridad industrial establecido por la empresa?'
    ];
    
    respuestas: { [key: string]: string } = {};
    observaciones: { [key: string]: string } = {};
    tabla: any[] = [];
    
  
    submitForm() {
      for (let pregunta of this.preguntas) {
        const nuevaFila = {
          pregunta: pregunta,
          respuestaSi: this.respuestas[pregunta] === 'si' ? 'X' : '',
          respuestaNo: this.respuestas[pregunta] === 'no' ? 'X' : '',
          observaciones: this.observaciones[pregunta]
          
        };
        this.tabla.push(nuevaFila);
        console.log(this.observaciones);
      }
    
      this.respuestas = {};
      this.observaciones = {};

      console.log('Tabla:', this.tabla);
    }
    
    
}
