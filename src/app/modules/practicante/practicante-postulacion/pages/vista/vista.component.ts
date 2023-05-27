import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Actividad } from 'src/app/core/models/actividad';
import { ConvocatoriaP } from 'src/app/core/models/convocatoria-p';
import { SolicitudEmpresa } from 'src/app/core/models/solicitud-empresa';
import { ActividadpService } from 'src/app/core/services/actividadp.service';
import { ConvocatoriaService } from 'src/app/core/services/convocatoria.service';
import * as pdfMake from 'pdfmake/build/pdfmake';
import * as pdfFonts from 'pdfmake/build/vfs_fonts';
import { Usuario } from 'src/app/core/models/usuario';
import { SoliEstudiante } from 'src/app/core/models/soli-estudiante';
import { SoliEstudianteService } from 'src/app/core/services/soli-estudiante.service';
import Swal from 'sweetalert2';
import { Convenio } from 'src/app/core/models/convenio';
import { Estudiante } from 'src/app/core/models/estudiante';
import { EstudianteService } from 'src/app/core/services/estudiante.service';

@Component({
  selector: 'app-vista',
  templateUrl: './vista.component.html',
  styleUrls: ['./vista.component.css']
})
export class VistaComponent implements OnInit {

  convocatoriap: ConvocatoriaP[];
  actividades: Actividad[];
  enabledButton: boolean;
  displayEU: boolean;
  actividad: Actividad;
  convocatoria: ConvocatoriaP;

  estudiante = new Estudiante;
  solicitude: SoliEstudiante = new SoliEstudiante()

  descargandoPDF: boolean = false;

  fechaI: Date = new Date;

  user: Usuario;

  constructor(private convocatoriaService: ConvocatoriaService,
    private actividadservice: ActividadpService, private route: ActivatedRoute, private soliestudianteservice: SoliEstudianteService,
    private estudianteservice: EstudianteService) { }

  ngOnInit(): void {
    this.user = JSON.parse(sessionStorage.getItem('userdetails') || "");
    this.route.queryParams.subscribe(params => {
      this.convocatoria = JSON.parse(params['convocatoria']);
      console.log(this.convocatoria);
      this.estudianteservice.buscarxUsuario(this.user.id).subscribe(
        (resul: Estudiante) => {
          this.estudiante = resul;
        }
      )

      this.obtenerActividadid(this.convocatoria.solicitudEmpresa.id)
    });
    this.obtenerConvocatoria();

  }

  private obtenerConvocatoria() {
    this.convocatoriaService.obtenerConvocatoria().subscribe(dato => { this.convocatoriap = dato; })
  }


  obtenerActividadid(id: number) {

    this.actividadservice.obtenerActividadid(id).subscribe(
      (data) => {
        this.actividades = data;
        console.log(this.actividades);
        this.actividad = this.actividades[0];
        console.log("actividad" + this.actividad)
      }
    )

  }

  Guardarsoli() {

    this.solicitude.estado = 0;
    this.solicitude.fechaEnvio = this.fechaI;
    this.solicitude.estudiante = this.estudiante;
    this.solicitude.convocatoria = this.convocatoria;

    this.soliestudianteservice.guardarsolicitud(this.solicitude).subscribe(
      (data: SoliEstudiante) => {
        console.log(data);
        Swal.fire('Solicitud guardado', 'Solicitud Guadada con exito', 'success');

      }, (error) => {
        console.log(error);
        Swal.fire('Error', 'Solicitud no se pudo Guardar', 'error');
      }
    )
  };

  getBase64ImageFromAssets(imagePath: string): Promise<string> {
    return fetch(imagePath)
      .then((response) => response.blob())
      .then((blob) => {
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

    pdfMake.vfs = pdfFonts.pdfMake.vfs

    // definir las márgenes del documento
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
          text: 'DOCUMENTO: Solicitud estudiantes carreras tradicionales',
          style: 'header',
          lineHeight: 1.5
        },
        {
          text: fechaCompleta,
          style: 'subheader',
          alignment: 'right',
          margin: [0, -5, 0, 0],
          lineHeight: 1.5
        },
        {
          text: '\nMagíster\n' + this.convocatoria.solicitudEmpresa.convenio.firmaInst.usuario.nombre + '\nRESPONSABLE DE PRÁCTICAS PRE PROFESIONALES DE LA CARRERA ' + this.convocatoria.solicitudEmpresa.convenio.carrera.nombre + '\nEn su Despacho. -\n\nDe mi consideración:',
          style: 'body',
          lineHeight: 1.5
        },
        {
          text: ['Por medio de la presente, Yo, ' + this.user.nombre.split(' ')
            .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
            .join(' ') + ' ' + this.user.apellido.split(' ')
              .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
              .join(' ') + ', con número de cédula ' + this.user.cedula + ', estudiante del quinto ciclo del periodo académico ' + this.user.periodo + ' de la carrera de Tecnología Superior en Desarrollo de Software, solicito comedidamente se autorice mi postulación para realizar las 240 horas de prácticas pre profesionales en la empresa ' + this.convocatoria.solicitudEmpresa.convenio.empresa.nombre + '. según solicitud: CONVOCATORIA ' + this.convocatoria.fechaInicio + ' ' + this.convocatoria.fechaFin + '.'],
          style: 'body'
        },
        {
          text: ['Acepto realizar el proceso de selección determinado por la empresa receptora y en caso de ser elegido, me comprometo a cumplir con la normativa de la empresa, presentar los requisitos solicitados por el Instituto Superior Tecnológico del Azuay como prueba de las actividades realizadas y demostrar profesionalismo, dedicación y honestidad en todo momento, dejando en alto el nombre de la institución educativa y colaborando en el fortalecimiento de la empresa receptora que me brinda la posibilidad de formarme en sus instalaciones.'],
          style: 'body'
        },
        {
          text: ['Sin más que informar me despido agradeciendo de antemano su colaboración.'],
          style: 'body'
        },
        {
          text: '\n\nAtentamente,',
          style: 'subheader'
        },
        {
          text: '\n\n\n\n_______________________\n' + this.user.nombre.split(' ')
            .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
            .join(' ') + ' ' + this.user.apellido.split(' ')
              .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
              .join(' ') + '\n' + this.user.telefono + '\n' + this.user.correo + '',
          style: 'signature'
        },



      ],
      styles: {
        header: {
          fontSize: 14,
          bold: true,
          margin: [0, 0, 0, 10]
        },
        subheader: {
          fontSize: 11,
          margin: [0, 10, 0, 5]
        },
        body: {
          fontSize: 11,
          margin: [0, 0, 0, 10],
          alignment: 'justify',
          lineHeight: 1.15
        },
        signature: {
          bold: true,
          alignment: 'center',
        },
      }
    };

    pdfMake.createPdf(documentDefinition).download('SolicitudEstudiante.pdf');

    this.displayEU = true;
  }





}
