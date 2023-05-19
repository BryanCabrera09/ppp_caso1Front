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

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit{
  opcionSeleccionada: string;
  opcionesGuardadas: string[] = [];
  Materias: Materia[] = []
  soli: SolicitudEmpresa= new SolicitudEmpresa
  convoca: ConvocatoriaP= new ConvocatoriaP
  fechaActual: Date = new Date();
  id: number=0

  ngOnInit(): void {
    this.materiaService.Listarmateria().subscribe(
      carr=> this.Materias = carr
    );

    this.rellenaSoli();
  }
  
  constructor(private materiaService: MateriaService, private convocaService: ConvocatoriaService,  private activatedRoute: ActivatedRoute,
    private soliService: SoliEmpresaService ){}

  guardarOpcion(e:any) {
    
   this.opcionSeleccionada = e.target.value
    if (this.opcionSeleccionada) {
      this.opcionesGuardadas.push(this.opcionSeleccionada);
      this.opcionSeleccionada = ''; // Limpiar la selección después de guardarla
    }
  }

  rellenaSoli(){
    /*this.activatedRoute.params.subscribe(params=>{
      let id = params['id']

      if(id){
        
      }
    })*/

    const soli = JSON.parse(localStorage.getItem('IdSoli') + '');
    this.id = parseInt(soli);

    this.soliService.buscarxID(this.id).subscribe(
      (data: SolicitudEmpresa)=>{
        this.soli=data
        this.convoca.solicitudEmpresa=this.soli
      }
    )
  }

  guardarConvoca(){
    this.convoca.fechaInicio = this.fechaActual
    this.convocaService.guardaConvoca(this.convoca).subscribe(
      (data) => {
        console.log(data);
        this.ngOnInit();
        Swal.fire('Convocatoria Guardad', 'Convocatoria Guardad con éxito en el sistema', 'success');
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
        { text: 'Cuenca, 07 de octubre del 2022', style: 'fecha' },
        '\n\n',
        { text: 'A los estudiantes Interesados:', style: 'subtitulo' },
        'Se convoca a los estudiantes de quinto ciclo en adelante de la carrera de TECNOLOGÍA SUPERIOR EN DESARROLLO DE SOFTWARE que deseen realizar sus prácticas pre profesionales en la empresa FUTURA CIA. LTDA., a presentar la solicitud correspondiente.',
        { text: 'Las actividades a desarrollar son:', style: 'subtitulo' },
        { ul: [
          'Modelar diagramas de Bases de Datos SQL (PostgreSQL)',
          'Creación de scripts SQL DDL y DML',
          'Realizar manuales de usuario del sistema.',
          'Generar la documentación técnica de los módulos del producto.',
          'Realizar tareas de testing y pruebas unitarias.',
          'Desarrollo frontend del sistema (React, NextJS, Typescrit, Redux Toolkit)',
          'Manejar el versionamiento en Github y metodología SCRUM.',
          'Desarrollo de microservicios en Spring Boot.',
          'Analizar y resolver problemas e investigar soluciones técnicas y tecnológicas'
        ] },
        '\n',
        { text: 'Por lo que los postulantes deberán haber aprobado las siguientes asignaturas:', style: 'subtitulo' },
        { ul: [
          'Base de datos avanzada',
          'Programación de Aplicaciones Web',
          'Desarrollo de Aplicaciones Móviles',
          'Tendencias actuales de programación'
        ] },
        '\n',
        { text: 'La fecha máxima en la que se receptarán las solicitudes es el día martes 11 de octubre del 2022.', style: 'subtitulo' },
        '\n',
        { text: 'Para mayor información contactarse con el Ing. Juan Gabriel Espinoza, docente responsable de prácticas pre profesionales de la carrera.', style: 'subtitulo' },
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
        'Ing. Juan Gabriel Espinoza',
        'Responsable de Prácticas pre profesionales',
        'CARRERA DE TECNOLOGÍA SUPERIOR EN DESARROLLO DE SOFTWARE',
        'INSTITUTO SUPERIOR UNIVERSITARIO TECNOLÓGICO DEL AZUAY',
        'Email: juan.espinoza@tecazuay.edu.ec'
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
