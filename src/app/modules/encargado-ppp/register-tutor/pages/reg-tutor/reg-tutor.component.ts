import { Component, OnInit } from '@angular/core';
import { TutorAcademico } from 'src/app/core/models/tutor-academico';

//PDF Import
import jsPDF from 'jspdf';

@Component({
  selector: 'app-reg-tutor',
  templateUrl: './reg-tutor.component.html',
  styleUrls: ['./reg-tutor.component.css']
})
export class RegTutorComponent implements OnInit {

  tutor_academico = new TutorAcademico;

  blockSpecial: RegExp = /^[^<>*!#@$%^_=+?`\|{}[\]~"'\.\,=abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVQWXYZ/;:]+$/;
  blockCorreo: RegExp = /^[_A-Za-z0-9-\+]+(\.[_A-Za-z0-9-]+)*@[A-Za-z0-9-]+(\.[A-Za-z0-9]+)*(\.[A-Za-z]{2,})$/;
  fechaActual: any;

  ngOnInit() {
  }

  generarPDF() {

    const doc = new jsPDF();
    const fecha = new Date();
    const options: any = {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    };
    const formatter = new Intl.DateTimeFormat('es-EC', options);
    const fechaFormateada = formatter.format(fecha);
    const fechaCompleta = `Cuenca, ${fechaFormateada}`;

    // Configurar el estilo de fuente y tamaño para el título y la fecha
    doc.setFont('Calibri', 'bold');
    doc.setFontSize(12);

    // Agregar el título y la fecha al documento
    doc.text('Documento: Designación tutor especifico', 20, 20);
    doc.text(fechaCompleta, 100, 30);

    // Configurar el estilo de fuente y tamaño para el nombre y la información del remitente
    doc.setFont('Calibri', 'normal');
    doc.setFontSize(12);

    // Agregar el nombre y la información del remitente
    doc.text('Magíster', 20, 50);
    doc.text('JUAN ESPINOZA', 20, 57);
    doc.text('RESPONSABLE DE PRÁCTICAS PRE PROFESIONALES DE LA CARRERA DE TECNOLOGÍA SUPERIOR EN DESARROLLO DE SOFTWARE', 20, 64);
    doc.text('INSTITUTO SUPERIOR UNIVERSITARIO TECNOLÓGICO DEL AZUAY', 20, 71);
    doc.text('Su Despacho. -', 20, 78);

    // Configurar el estilo de fuente y tamaño para el cuerpo del texto
    doc.setFont('Calibri', 'normal');
    doc.setFontSize(12);

    // Agregar el cuerpo del texto
    doc.text('De mi consideración:', 20, 98);
    doc.text('Luego de expresarle un atento saludo me permito informar que el Ing. Patricio Leonardo Pacheco Quezada con cédula de identidad número: 0103629762 ha sido designado como TUTOR ESPECIFICO del estudiante Juan Carlos Matute Uzhca.', 20, 105);
    doc.text('El Ing. Leonardo Patricio Pacheco Quezada se compromete a colaborar y guiar en las actividades que se encomienden al estudiante procurando siempre un ambiente laboral óptimo para la ejecución de las prácticas pre profesionales.', 20, 122);
    doc.text('Sin más que informar, me despido augurando éxito en las funciones que realiza.', 20, 139);

    // Configurar el estilo de fuente y tamaño para la despedida
    doc.setFont('Calibri', 'normal');
    doc.setFontSize(12);

    // Agregar la despedida y el espacio en blanco
    doc.text('Atentamente,', 20, 156);
    doc.text('', 20, 171);

    // Configurar el estilo de fuente y tamaño para la firma
    doc.setFont('Calibri', 'bold');
    doc.setFontSize(12);

    // Agregar la firma
    doc.text('_______________________', 20, 178);
    doc.text('Ing. Patricio Pacheco', 20, 184);
    doc.text('GERENTE GENERAL', 20, 191);
    doc.text('Gesinsoft Cia. Ltda.', 50, 199);

    doc.save('Designacion_tutor_especifico.pdf');

  } 

}
