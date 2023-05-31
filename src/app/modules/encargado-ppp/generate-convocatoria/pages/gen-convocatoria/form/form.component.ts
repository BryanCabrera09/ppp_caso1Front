import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Carrera } from 'src/app/core/models/carrera';
import { ConvocatoriaP } from 'src/app/core/models/convocatoria-p';
import { Materia } from 'src/app/core/models/materia';
import { SolicitudEmpresa } from 'src/app/core/models/solicitud-empresa';
import { CarreraMateriaService } from 'src/app/core/services/carrera-materia.service';
import { ConvocatoriaService } from 'src/app/core/services/convocatoria.service';
import { MateriaService } from 'src/app/core/services/materia.service';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
import { RegEmpresaServiceService } from 'src/app/core/services/reg-empresa-service.service';
import { SoliEmpresaService } from 'src/app/core/services/soli-empresa.service';
import Swal from 'sweetalert2';
import { Actividad } from 'src/app/core/models/actividad';
import { ActividadpService } from 'src/app/core/services/actividadp.service';
import { HttpResponse } from '@angular/common/http';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {
  opcionSeleccionada: string;
  opcionesGuardadas: string[] = [];
  materias: Materia[] = []
  act: Actividad[] = []
  soli: SolicitudEmpresa = new SolicitudEmpresa
  convoca: ConvocatoriaP = new ConvocatoriaP
  actividades: Actividad = new Actividad
  fechaActual: Date = new Date();
  idA: number = 0

  displayEU: boolean;

  archivo: File;
  id: number;

  blockSpecial: RegExp = /^[^<>*!#@$%^_=+?`\|{}[\]~"'\.\,=abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVQWXYZ/;:]+$/;

  ngOnInit(): void {
    this.materiaService.Listarmateria().subscribe(
      carr => this.materias = carr
    );

    this.rellenaSoli();
    this.llamaActividades();
    this.traernumero()
    //this.llamarNConvocatoria()
  }

  constructor(private materiaService: MateriaService, private convocaService: ConvocatoriaService, private activatedRoute: ActivatedRoute,
    private soliService: SoliEmpresaService, private actividadService: ActividadpService,) { }

  guardarOpcion(e: any) {

    this.opcionSeleccionada = e.target.value
    if (this.opcionSeleccionada) {
      this.opcionesGuardadas.push(this.opcionSeleccionada);
      this.opcionSeleccionada = ''; // Limpiar la selección después de guardarla
    }
  }

  llamaActividades() {

    this.activatedRoute.params.subscribe(params => {
      let id = params['id']
      this.id = id;
      if (id) {
        this.actividadService.obtenerActividadid(id).subscribe(
          (data) => {
            this.act = data;
            this.actividades = this.act[0];
            console.log(this.actividades)
            console.log(this.act)
          }
        )
      }
    })
  }

  onFileChange(event: any) {
    this.archivo = event.target.files[0];
  }

  updatePDFSolicitud() {

    this.convocaService.guardarPDF(this.archivo, this.id).subscribe(
      (response: any) => {
        Swal.fire('Registro', 'PDF actualizado correctamente', 'success');
        this.reloadPage();
      },
      (error) => {
        console.error('Error al actualizar el PDF', error);
        Swal.fire('Registro', 'Error al subir el PDF', 'error');
      }
    );
  }

  descargarPDF(value) {
    this.convocaService.obtenerPDF(value).subscribe(response => {
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

  reloadPage() {
    window.location.reload();
  }

  traernumero() {
    this.convocaService.traerNumero().subscribe(
      (data: ConvocatoriaP) => {
        this.convoca.numero = data.numero + 1
      },
      (error: any) => {
        this.convoca.numero = 1
      }
    )
  }

  rellenaSoli() {

    this.activatedRoute.params.subscribe(params => {
      let id = params['id']

      if (id) {
        this.soliService.buscarxID(id).subscribe(
          (data: SolicitudEmpresa) => {
            this.soli = data
            this.convoca.solicitudEmpresa = this.soli

          }
        )
      }
    })
  }

  guardarConvoca() {
    this.convoca.fechaInicio = this.fechaActual
    this.convocaService.guardaConvoca(this.convoca).subscribe(
      (data) => {
        console.log(data);
        this.ngOnInit();
        Swal.fire('Convocatoria Guardada', 'Convocatoria Guardad con éxito en el sistema', 'success');
        localStorage.removeItem('IdSoli')
        //window.location.reload();
      }, (error) => {
        console.log(error);
        Swal.fire('Error', 'Convocatoria no guardada', 'error');
      }
    );
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

    // definir las márgenes del documento
    var marginLeft = 74;
    var marginRight = 74;
    var marginTop = 25;
    var marginBottom = 100;

    pdfMake.vfs = pdfFonts.pdfMake.vfs;

    const documentoPDF = {
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
          text: 'CONVOCATORIA – TSDS -PPP-2022-013',
          style: 'titulo'
        },
        '\n',
        {
          text: fechaCompleta,
          style: 'subheader',
          alignment: 'right',
          margin: [0, -10, 0, 0]
        },
        '\n\n',
        {
          text: 'A los estudiantes Interesados:',
          style: 'subtitulo'
        },
        'Se convoca a los estudiantes de quinto ciclo en adelante de la carrera de ' + this.soli.convenio.carrera.nombre + ' que deseen realizar sus prácticas pre profesionales en la empresa FUTURA CIA. LTDA., a presentar la solicitud correspondiente.',
        {
          text: 'Las actividades a desarrollar son:',
          style: 'subtitulo'
        },
        {
          ul: [
            this.act.map(dato => ({ text: dato.descripcion }))
          ]
        },
        '\n',
        { text: 'Por lo que los postulantes deberán haber aprobado las siguientes asignaturas:', style: 'subtitulo' },
        {
          ul: [
            this.opcionesGuardadas
          ]
        },
        '\n',
        { text: 'La fecha máxima en la que se receptarán las solicitudes es ' + this.convoca.fechaFin + '.', style: 'subtitulo' },
        '\n',
        { text: 'Para mayor información contactarse con el' + this.soli.convenio.firmaInst.usuario.nombre + ' ' + this.soli.convenio.firmaInst.usuario.apellido + ', docente responsable de prácticas pre profesionales de la carrera.', style: 'subtitulo' },
        '\n',
        { text: 'Nota: Adjunto a la solicitud se debe remitir la hoja de vida, para lo cual deberá registrarse en el portal web encuentraempleo, e imprimir el currículo en formato moderno a través del siguiente enlace:', style: 'nota' },
        { text: 'https://encuentraempleo.trabajo.gob.ec', link: 'https://encuentraempleo.trabajo.gob.ec', color: 'blue' },
        '\n\n',
        { text: 'Los formatos para el proceso pueden ser descargados de la página web institucional desde el menú de Vinculación, en la opción prácticas pre profesionales:', style: 'nota' },
        { text: 'https://www.tuwebinstitucional.com/vinculacion/practicas-pre-profesionales', link: 'https://www.tuwebinstitucional.com/vinculacion/practicas-pre-profesionales', color: 'blue' },
        '\n\n',
        { text: 'Enviar las solicitudes al correo: vinculacion.tsds@tecazuay.edu.ec', style: 'subtitulo' },
        '\n\n',
        { text: 'IMPORTANTE: EL FORMATO DE ENVÍO DEL ASUNTO DEL CORREO DEBERÁ TENER EL NUMERO DE CONVOCATORIA SEGUIDO DE SU NOMBRE. EJEMPLO: CONVOCATORIA – TSDS -PPP-2022-013-NOMBRE-APELLIDO', style: 'nota' },
        '\n\n',
        '\n\n',
        { text: 'Atentamente,', style: 'firmado' },
        '\n\n',
        { text: '_______________________', style: 'firma' },
        this.soli.convenio.firmaInst.usuario.nombre + ' ' + this.soli.convenio.firmaInst.usuario.apellido,
        'Responsable de Prácticas pre profesionales',
        this.soli.convenio.carrera.nombre,
        'INSTITUTO SUPERIOR UNIVERSITARIO TECNOLÓGICO DEL AZUAY',
        this.soli.convenio.firmaInst.usuario.correo
      ],
      styles: {
        titulo: {
          fontSize: 18,
          bold: true,
          alignment: 'center',
          margin: [0, 0, 0, 10]
        },
        subtitulo: {
          fontSize: 12,
          bold: true,
          margin: [0, 5, 0, 5]
        },
        fecha: {
          fontSize: 12,
          alignment: 'right',
          margin: [0, 0, 0, 10]
        },
        nota: {
          fontSize: 10,
          margin: [0, 5, 0, 5]
        },
        firmado: {
          fontSize: 12,
          bold: true
        },
        firma: {
          fontSize: 12,
          margin: [0, 5, 0, 5]
        }
      }
    };

    pdfMake.createPdf(documentoPDF).download('convocatoria.pdf');
  }

}
