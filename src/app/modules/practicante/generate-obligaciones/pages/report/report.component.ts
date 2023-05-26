import { Component, OnInit } from '@angular/core';
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

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.css']
})
export class ReportComponent implements OnInit {

  loading: boolean = true
  estudianteId: number;
  estudiante = new Estudiante;
  practica = new Practica;
  usuario = new Usuario;
  empresa = new Empresa;
  convocatoria = new ConvocatoriaP;

  calificacion = new Calificacion;

  idUs: number;

  displayEU: boolean;

  acronimo: string;

  ngOnInit() {
    this.buscarEstudiante()
  }

  constructor(private estudianteService: EstudianteService, private practicaService: PracticasService, private calificacionService: CalificacionService) { }


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

  buscarPracticas() {
    // Obtener las prácticas del estudiante por su ID
    this.practicaService.buscarxEstudiante(this.estudiante.id).subscribe(
      (data: Practica) => {
        this.practica = data;
        this.empresa = data.convocatoria.solicitudEmpresa.convenio.empresa;
        this.convocatoria = data.convocatoria;
        this.buscarCalificaciones();
      },
      (error) => {
        console.error(error);
      }
    );
    this.loading = false;
  }

  buscarCalificaciones() {
    // Obtener las calificaciones del estudiante por su ID
    this.calificacionService.buscarxPractica(this.practica.id).subscribe(
      (data: Calificacion) => {
        this.calificacion = data;
        console.log(data);
      },
      (error) => {
        console.error(error);
      }
    );
    this.loading = false;
  }

  fileSelected(event: any) {
    const file: File = event.target.files[0];
    const reader = new FileReader();

    reader.onloadend = () => {
      const base64String = reader.result as string;
      // Aquí puedes almacenar o procesar la cadena Base64 como necesites
      console.log(base64String);
    };

    reader.readAsDataURL(file);
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
          text: 'ANEXO 2\nOBLIGACIONES GENERALES DEL ESTUDIANTE Y ACUERDO DE CONFIDENCIALIDAD',
          style: 'header',
          alignment: "center",
          lineHeight: 1.5
        },
        {
          text: 'El estudiante tendrá las siguientes obligaciones:',
          style: 'subheader'
        },
        {
          type: 'lower-alpha',
          ol: [
            'Cumplir con los requerimientos académicos de la IES y los de su formación en la entidad receptora formadora;;',
            'Participar activamente en el desarrollo de su formación profesional y ejecutar las tareas que le fueran encomendadas en atención a las orientaciones técnicas recibidas de los tutores;',
            'Cumplir con los horarios, normas disciplinarias, y de seguridad y salud, reglas de comportamiento ético y otras, establecidas en la IES y en la entidad receptora formadora. El incumplimiento comprobado de dichos instrumentos normativos será causa para el inicio de un procedimiento disciplinario en la IES, sin perjuicio de la decisión de la entidad receptora formadora con relación a la permanencia del estudiante en la misma;',
            'Comunicar y justificar oportunamente a la entidad receptora formadora la inasistencia a su formación por motivos de fuerza mayor, enfermedad o calamidad doméstica, debidamente probadas;',
            'Utilizar las herramientas, máquinas, equipos e insumos asignados para su formación según las indicaciones técnicas recibidas, tanto en el entorno institucional educativo como en el entorno laboral real. Los daños ocasionados en los citados recursos que sean producto de negligencia, impericia o imprudencia, debidamente probada, serán responsabilidad del estudiante, tanto disciplinaria como financieramente, situación que deberá estar prevista en el respectivo convenio, de forma que la IES pueda repetir contra el estudiante, aquellos valores que hayan sido cancelados por concepto de reparación de daños;',
            'Guardar estricta reserva sobre la información y productos generados en la entidad receptora formadora, en correspondencia con las normas establecidas las orientaciones recibidas. El incumplimiento comprobado de dichos instrumentos normativos será causa para el inicio de un procedimiento disciplinario en la IES, sin perjuicio de la decisión de la entidad receptora formadora con relación a la permanencia del estudiante en la misma y las acciones legales que esta pudiera emprender;',
            'Realizar la evaluación correspondiente a la actividad educativa de profesores y tutores, tanto en la IES como en la entidad receptora formadora; instrumentos normativos será causa para el inicio de un procedimiento disciplinario en la IES, sin perjuicio de la decisión de la entidad receptora formadora con relación a la permanencia del estudiante en la misma y las acciones legales que esta pudiera emprender;',
            'Suscribir el acuerdo de confidencialidad con la entidad receptora formadora de acuerdo a los siguientes aspectos:',
          ],
          style: 'body',
          marginLeft: -12
        },
        {
          type: 'lower-alpha',
          ol: [
            'No divulgar a terceras personas o instituciones el contenido de cualquier documentación o información de la empresa ' + this.empresa.nombre + ', que haya sido obtenida como parte del proceso de prácticas preprofesionales;',
            'No permitir a terceros el manejo de documentación de la empresa, que pueda tener en mi poder;',
            'No explotar y aprovechar en beneficio propio, o permitir el uso por otros, de las informaciones obtenidas o conocimientos adquiridos durante el proceso de formación dual;',
            'En caso de tener acceso a documentación importante de la empresa asumo ética y responsablemente el manejo y/o acceso a la misma.',
            'Finalizado mi proceso formativo, no conservar documentación que sea de propiedad de la empresa formadora, ni permitir que se realicen copias no autorizadas de esta información.',
            'Elaborar la bitácora de la formación en el entorno laboral real, que deberá contener las actividades realizadas diariamente y ser entregada al tutor general responsable para su validación; así como también su registro de asistencia debidamente legalizado. Una vez validados estos documentos, será responsabilidad del estudiante ponerlos a consideración del tutor académico de acuerdo a los tiempos establecidos en el plan de aprendizaje práctico.'
          ],
          style: 'body',
          marginLeft: 20
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
          lineHeight: 1.15
        },
        signature: {
          alignment: 'center',
          bold: true,
        },
      }
    };

    pdfMake.createPdf(documentDefinition).open()/* download('obligaciones-estudiante.pdf') */;
  }
}
