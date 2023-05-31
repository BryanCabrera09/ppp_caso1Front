import { Component } from '@angular/core';
import { PdfMakeWrapper, Txt, Table, Cell } from 'pdfmake-wrapper';
import { FormsModule } from '@angular/forms';
import { Calificacion } from 'src/app/core/models/calificacion';
import { ConvocatoriaP } from 'src/app/core/models/convocatoria-p';
import { Empresa } from 'src/app/core/models/empresa';
import { Estudiante } from 'src/app/core/models/estudiante';
import { Practica } from 'src/app/core/models/practica';
import { Usuario } from 'src/app/core/models/usuario';
import { CalificacionService } from 'src/app/core/services/calificacion.service';
import { EstudianteService } from 'src/app/core/services/estudiante.service';
import { PracticasService } from 'src/app/core/services/practicas.service';
//PDF Import
import * as pdfMake from 'pdfmake/build/pdfmake';
import * as pdfFonts from 'pdfmake/build/vfs_fonts';
import { ToastrService } from 'ngx-toastr';
import { Anexos } from 'src/app/core/models/anexos';
import { AnexosService } from 'src/app/core/services/anexos.service';
import Swal from 'sweetalert2';
import { HttpResponse } from '@angular/common/http';
import { Router } from '@angular/router';
@Component({
  selector: 'app-reporte-salud',
  templateUrl: './reporte-salud.component.html',
  styleUrls: ['./reporte-salud.component.css']
})

export class ReporteSaludComponent {

  preguntas: string[] = [
    '1. Ha recibido una charla informativa sobre las medidas de seguridad industrial de la empresa y prevención de riesgos laborales?',
    '2. Ha recibido una socialización del reglamento de seguridad industrial?',
    '3. Ha recibido el equipo de protección personal mínimo establecido por la empresa?',
    '4. Ha adquirido el equipo mínimo de seguridad industrial establecido por la empresa?'
  ];

  respuestas: { [key: string]: string } = {};
  observaciones: { [key: string]: string } = {};
  tabla: any[] = [];

  mostrarMensaje: boolean = false;

  guardado: boolean = false;

  loading: boolean = true
  estudianteId: number;
  estudiante = new Estudiante;
  practica = new Practica;
  usuario = new Usuario;
  empresa = new Empresa;
  convocatoria = new ConvocatoriaP;
  anexo = new Anexos;

  calificacion = new Calificacion;

  idUs: number;

  displayEU: boolean;
  entrPrac: boolean;

  acronimo: string;
  btnPdf: boolean;

  archivo: File;
  id: number;

  ngOnInit() {
    this.buscarEstudiante()
  }

  constructor(private estudianteService: EstudianteService, private practicaService: PracticasService, private calificacionService: CalificacionService
    , private anexoService: AnexosService, private toastr: ToastrService, private router: Router) { }


  buscarEstudiante() {
    // Obtener el estudiante por ID de usuario
    this.usuario = JSON.parse(sessionStorage.getItem('userdetails')!);
    this.idUs = this.usuario.id;
    console.log(this.idUs)

    // Reemplazar con el ID de usuario correspondiente
    this.estudianteService.buscarxUsuario(this.idUs).subscribe(
      (data: Estudiante) => {
        this.estudiante.id = data.id;
        this.buscarPracticas();
      },
      (error) => {
        console.error(error);
      }
    );
  }

  onFileChange(event: any) {
    this.archivo = event.target.files[0];
  }

  updatePDF() {

    this.anexo.tipo = 12;
    this.anexo.practica = this.practica;
    this.anexoService.registerAnexo(this.anexo).subscribe(
      (response: Anexos) => {
        this.id = response.id;
        this.toastr.success("Anexo Creado", "Anexo");
      },
      (error) => {
        this.toastr.error("Error al Crear Anexo", "Anexo");
      }
    );

    console.log(this.id);
    this.anexoService.guardarPDF(this.archivo, this.id).subscribe(
      (response: any) => {
        Swal.fire('Registro', 'PDF actualizado correctamente', 'success');
        this.router.navigate(['../lista-practicas']);
      },
      (error) => {
        console.error('Error al actualizar el PDF', error);
        Swal.fire('Registro', 'Error al subir el PDF', 'error');
      }
    );
  }

  descargarPDF(value) {
    this.anexoService.obtenerPDF(value).subscribe(response => {
      const filename = this.getFilenameFromResponse(response);
      this.downloadFile(response.body, filename);
    });
  }

  private getFilenameFromResponse(response: HttpResponse<Blob>): string {
    const contentDispositionHeader = response.headers.get('Content-Disposition');
    const matches = /filename[^;=\n]=((['"]).?\2|[^;\n]*)/.exec(contentDispositionHeader);
    if (matches != null && matches[1]) {
      return matches[1].replace(/['"]/g, '');
    }
    return 'SolicitudEstudiante.pdf';
  }

  private downloadFile(data: Blob, filename: string) {
    const blob = new Blob([data], { type: 'application/pdf' });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    link.click();
    window.URL.revokeObjectURL(url);
  }

  buscarPracticas() {
    this.practicaService.buscarxEstudiante(this.estudiante.id).subscribe(
      (data: Practica) => {
        this.practica = data;
        this.empresa = data.convocatoria.solicitudEmpresa.convenio.empresa;
        this.convocatoria = data.convocatoria;
        this.entrPrac = true;
      },
      (error) => {
        console.error(error);
      }
    );
    this.loading = false;
  }


  submitForm() {
    if (this.validateForm()) {
      this.mostrarMensaje = false;

      for (let pregunta of this.preguntas) {
        const nuevaFila = {
          pregunta: pregunta,
          respuestaSi: this.respuestas[pregunta] === 'si' ? 'X' : '',
          respuestaNo: this.respuestas[pregunta] === 'no' ? 'X' : '',
          observaciones: this.observaciones[pregunta]
        };
        this.tabla.push(nuevaFila);
      }

      this.respuestas = {};
      this.observaciones = {};

      this.guardado = true;
      console.log('Tabla:', this.tabla);
    } else {
      this.mostrarMensaje = true;
      setTimeout(() => {
        this.mostrarMensaje = false;
      }, 3000); // Temporizador de 2 segundos (2000 milisegundos)
    }
  }

  validateForm(): boolean {
    for (let pregunta of this.preguntas) {
      if (!this.respuestas[pregunta] || !this.respuestas[pregunta].trim()) {
        this.btnPdf = false;
        return false;
      }
    }
    this.btnPdf = true;
    return true;
  }

  async getBase64ImageFromAssets(imagePath: string): Promise<string> {
    const response = await fetch(imagePath);
    const blob = await response.blob();

    return new Promise<string>((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        resolve(reader.result as string);
      };
      reader.onerror = () => {
        reject(reader.error);
      };
      reader.readAsDataURL(blob);
    });
  }
  /****************************** */
  async generarPDF() {
    //Fecha Actual
    const fecha = new Date();
    const options: any = {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    };
    const formatter = new Intl.DateTimeFormat('es-EC', options);
    const fechaFormateada = formatter.format(fecha);
    const fechaCompleta = `Cuenca, ${fechaFormateada}`;

    //Logo Ista 
    const imageData = await this.getBase64ImageFromAssets("assets/images/Logo-ISTA.png");

    pdfMake.vfs = pdfFonts.pdfMake.vfs;

    // Definir las márgenes del documento
    var marginLeft = 74;
    var marginRight = 74;
    var marginTop = 25;
    var marginBottom = 100;

    const documentDefinition = {
      pageSize: 'A4',
      pageMargins: [marginLeft, marginTop, marginRight, marginBottom],
      content: [
        {
          image: imageData,
          width: 145,
          height: 45,
          alignment: "left",
          margin: [0, 0, 0, 10],
        },
        {
          text: '\nANEXO 3: CONSTANCIA DE INDUCCIÓN EN SALUD OCUPACIONAL Y ENTREGA DE EQUIPOS DE PROTECCIÓN PERSONAL (EPP)',
          style: 'header',
          alignment: "center",
          lineHeight: 1.5,
          marginLeft: -12
        },
        {
          text: [
            '\nYo ' + this.usuario.nombre + ' ' + this.usuario.apellido + ', con cédula de identidad ' + this.usuario.cedula + ', estudiante del ' + this.practica.estudiante.ciclo + ' paralelo A del periodo académico: ' + this.practica.estudiante.periodo + '  de la carrera de Tecnología Superior en Desarrollo de Software, doy a conocer que en la empresa formadora ' + this.convocatoria.solicitudEmpresa.convenio.empresa.nombre + ', he recibido los siguientes aspectos en lo referente a medidas de seguridad industrial y prevención de riesgos dentro de la empresa:'
          ],
          style: 'body',
          marginLeft: -12
        },
        {
          table: {
            headerRows: 1,
            widths: ['auto', 'auto', 'auto', '*'],
            body: [
              ['Aspectos', 'Si', 'No', 'Observaciones'],
              ...this.tabla.map(fila => [fila.pregunta, fila.respuestaSi, fila.respuestaNo, fila.observaciones])
            ]
          },
          style: 'table',
          marginLeft: -12
        },
        {
          text: '\n\n\n\n___________________________\nFirma del estudiante',
          style: 'signature'
        },
        {
          text: this.usuario.nombre.split(' ')
            .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
            .join(' ') + ' ' + this.usuario.apellido.split(' ')
              .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
              .join(' '),
          style: 'signature'
        },
        {
          text: this.usuario.cedula,
          style: 'signature'
        }
      ],
      styles: {
        header: {
          fontSize: 11,
          bold: true,
          margin: [0, 0, 0, 0]
        },
        subheader: {
          fontSize: 11,
          margin: [0, 5, 0, 7]
        },
        body: {
          fontSize: 11,
          margin: [0, 0, 0, 10],
          alignment: 'justify',
          lineHeight: 2
        },
        signature: {
          alignment: 'center',
          bold: true,
        },
      }
    };

    const pdfName = 'A3_InduccionSaludOcupacional.pdf';

    pdfMake.createPdf(documentDefinition).download(pdfName);
  }





}
