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
  id: number = 0
  idA: number = 0

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

traernumero(){
  this.convocaService.traerNumero().subscribe(
    (data:ConvocatoriaP)=>{
      this.convoca.numero = data.numero+1
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


  generarPDF() {
    pdfMake.vfs = pdfFonts.pdfMake.vfs;
    const documentoPDF = {
      content: [
        { text: 'CONVOCATORIA – TSDS -PPP-2022-013', style: 'titulo' },
        '\n',
        { text: '' + this.fechaActual + '', style: 'fecha' },
        '\n\n',
        { text: 'A los estudiantes Interesados:', style: 'subtitulo' },
        'Se convoca a los estudiantes de quinto ciclo en adelante de la carrera de ' + this.soli.convenio.carrera.nombre + ' que deseen realizar sus prácticas pre profesionales en la empresa FUTURA CIA. LTDA., a presentar la solicitud correspondiente.',
        { text: 'Las actividades a desarrollar son:', style: 'subtitulo' },
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

    pdfMake.createPdf(documentoPDF).open();
  }

}
