import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Calificacion } from 'src/app/core/models/calificacion';
import { Estudiante } from 'src/app/core/models/estudiante';
import { Practica } from 'src/app/core/models/practica';
import { SemanaActividad } from 'src/app/core/models/semana-actividad';
import { TutorAcademico } from 'src/app/core/models/tutor-academicoRS';
import { Usuario } from 'src/app/core/models/usuario';
import { EstudianteService } from 'src/app/core/services/estudiante.service';
import { PracticasService } from 'src/app/core/services/practicas.service';
import { SemanaActividadService } from 'src/app/core/services/semana-actividad.service';
import { TutorAcademicoService } from 'src/app/core/services/tutor-academico.service';
import { NgxFileDropEntry, FileSystemFileEntry, FileSystemDirectoryEntry } from 'ngx-file-drop';
import { ToastrService } from 'ngx-toastr';
import * as pdfMake from 'pdfmake/build/pdfmake';
import * as pdfFonts from 'pdfmake/build/vfs_fonts';



@Component({
  selector: 'app-listprac',
  templateUrl: './listprac.component.html',
  styleUrls: ['./listprac.component.css']
})
export class ListpracComponent implements OnInit{
  actividades: SemanaActividad[] = []; // Lista de actividades
  imagenesSemana: any[] = [];
  actividadesporsemana: any[] =[];



  practicantes= new Estudiante;
  tutoraca =new TutorAcademico;

  estudianteId: number;
  estudiante = new Estudiante;
  practica = new Practica;
  usuario = new Usuario;

  calificacion = new Calificacion;

  calificaciones: Calificacion[];

  PracticanteList:Estudiante[]=[];
  Practicas:Practica[]=[];

  id: number;
  
  loading: boolean=true;
  idUs: any;

  constructor(private practicanteServicio :PracticasService,private userl: TutorAcademicoService, private router:Router, private estudianteService: EstudianteService,private toastr: ToastrService, private semanaService: SemanaActividadService){}
  
  ngOnInit() { 
    this.buscarEstudiante();
  }

  editarPractica(id: number, practica: Practica) {
    this.practicanteServicio.editarPractica(id, practica).subscribe(
      (response) => {
        console.log('La práctica ha sido editada con éxito');
        // Realiza las operaciones adicionales necesarias después de editar la práctica
      },
      (error) => {
        console.error('Error al editar la práctica:', error);
      }
    );
  }
  
  semanasValidas: boolean[] = [];
  getActividadesPorSemana() {
    const actividadesPorSemana = [];
    const actividadesPorSemana2=this.getActividadesPorSemana; 
    const numDiasPorSemana = 5;
    const totalSemanas = Math.ceil(this.actividades.length / numDiasPorSemana);
  
    
    this.semanasValidas = [];
  
    for (let i = 0; i < totalSemanas; i++) {
      const inicio = i * numDiasPorSemana;
      const fin = inicio + numDiasPorSemana;
      const semanaActividades = this.actividades.slice(inicio, fin);
  
      const semanaValida = this.imagenesSemana[i] !== undefined; 
      this.semanasValidas.push(semanaValida);
  
      actividadesPorSemana.push({
        semana: i + 1,
        actividades: semanaActividades
      });
    }
  
    return actividadesPorSemana;
  }

  public dropped(event: any, semanaIndex: number): void {
    const files = Array.from(event.target.files);
  
    for (const droppedFile of files) {
      if (droppedFile instanceof File) {
        const file = droppedFile as File;
        const reader = new FileReader();
        
        reader.onload = (fileReaderEvent: any) => {
          // Aquí puedes hacer cualquier procesamiento necesario con la imagen
          // Por ejemplo, puedes leer el archivo y guardarlo en la lista temporal
          this.imagenesSemana[semanaIndex] = fileReaderEvent.target.result;
        };
  
        reader.readAsDataURL(file);
      }
    }
  }
  
  
  conclusion: string = '';

  generarPDF() {
    /*
    if (this.semanasValidas.includes(false)) {
      this.toastr.error('Debes agregar todas las imagenes', 'Datos Incompletos');
      return;
    }
  
    if (!this.conclusion || this.conclusion.trim() === '') {
      this.toastr.error('Debes agregar una conclusión', 'Datos Incompletos');
      return;
    }*/


    this.practica.concluciones=this.conclusion;
    //this.editarPractica(this.practica.id, this.practica);
    this.generarPDF1();
  }

  obtenerActividades(id: number) {
    this.semanaService.listaractividades(id).subscribe(
      (data: any[]) => {
        this.actividades = data;
        this.actividadesporsemana=this.getActividadesPorSemana();
      },
      (error) => {
        console.error('Error al obtener las actividades', error);
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
  async generarPDF1() {

   
    const nomnreEst = this.usuario.nombre.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()).join(' ') + ' ' + this.usuario.apellido.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()).join(' ')
    const nombreInstituto = this.practica.tutorInstituto.usuario.nombre.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()).join(' ') + ' ' + this.practica.tutorInstituto.usuario.apellido.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()).join(' ');
    const nombreEspecifico = this.practica.tutorEmpresarial.usuario.nombre.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()).join(' ') + ' ' + this.practica.tutorEmpresarial.usuario.apellido.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()).join(' ');
    const fecha = new Date();
    const options: any = {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    };
    const formatter = new Intl.DateTimeFormat('es-EC', options);
    const fechaFormateada = formatter.format(fecha);
    const fechaCompleta = `Cuenca, ${fechaFormateada}`;

    function convertirNumeroEnLetras(numero) {
      const numerosEnLetras = ['Egresado', 'Primero', 'Segundo', 'Tercero', 'Cuarto', 'Quinto', 'Sexto']; // Agrega más elementos según necesites
      return numerosEnLetras[numero] || '';
    }
    

    // Logo Ista 
    const imageData = await this.getBase64ImageFromAssets("assets/images/Logo-ISTA.png");

    pdfMake.vfs = pdfFonts.pdfMake.vfs;

    // Definir las márgenes del documento
    var marginLeft = 74;
    var marginRight = 74;
    var marginTop = 70;
    var marginBottom = 100;

    const documentDefinition = {
      pageSize: 'A4',
      pageMargins: [marginLeft, marginTop, marginRight, marginBottom],
      header: function (currentPage, pageCount) {
        return {
          image: imageData,
          width: 145,
          height: 45,
          alignment: "left",
          margin: [50, 15, -10, 100],
        };
      },
      content: [

        {
          text: 'INSTITUTO SUPERIOR UNIVERSITARIO TECNOLÓGICO DEL AZUAY \nTECNOLOGÍA SUPERIOR EN DESARROLLO DE SOFTWARE \nANEXO 8: INFORME FINAL DE ACTIVIDADES DE PRÁCTICAS PRE \nPROFESIONALES',
          style: 'header',
          alignment: "center",
          lineHeight: 1.5,
          marginLeft: -12
        },
        {
          text: fechaCompleta,
          style: 'subheader',
          alignment: 'right',
          margin: [0, -5, 0, 0],
          lineHeight: 1.5
        },
        {
          text: '1. INFORMACIÓN GENERAL',
          style: 'subheaderBold',
          margin: [0, 10, 0, 0]
        },
        {
          style: 'table',
          table: {
            widths: ['auto', '*', '*', '*'],
            body: [
              [{ text: 'A. DATOS GENERALES DE LA EMPRESA / INSTITUCIÓN', colSpan: 4, style: 'tableHeader' }, '', '', ''],
              ['NOMBRE:', { text: this.practica.convocatoria.solicitudEmpresa.convenio.empresa.nombre, colSpan: 3, style: 'tableHeader' }, '', ''],
              ['UBICACIÓN:\n(Ciudad y Dirección)', { text: 'Avenida General Torres, Edifcio Impacto', colSpan: 3, style: 'tableHeader' }, '', ''],
              ['ÁREA O DEPARTAMENTO', { text: 'Departamento', colSpan: 3, style: 'tableHeader' }, '', ''],
              [{ text: 'B. DATOS DEL TUTOR ESPECÍFICO', colSpan: 4, style: 'tableHeader' }, '', '', ''],
              ['NOMBRE COMPLETO:', nombreEspecifico, 'CÉDULA DE \nIDENTIDAD:', this.practica.tutorEmpresarial.usuario.cedula],
              ['CARGO:', this.practica.tutorEmpresarial.cargo, 'TELÉFONO EMPRESA:', '22054561625'],
              ['CORREO ELECTRÓNICO:', { text: this.practica.tutorEmpresarial.usuario.correo, colSpan: 3, style: 'tableHeader' }, '', ''],
              [{ text: 'C. DATOS DEL ESTUDIANTE', colSpan: 4, style: 'tableHeader' }, '', '', ''],
              ['NOMBRE COMPLETO:', { text: nomnreEst, colSpan: 3, style: 'tableHeader' }, '', ''],
              ['CÉDULA DE IDENTIDAD:', { text: this.practica.estudiante.usuario.cedula, colSpan: 3, style: 'tableHeader' }, '', ''],
              ['CICLO:', { text: convertirNumeroEnLetras(this.practica.estudiante.ciclo), colSpan: 3, style: 'tableHeader' }, '', ''],
              ['CORREO ELECTRÓNICO:', { text: this.practica.estudiante.usuario.correo, colSpan: 3, style: 'tableHeader' }, '', ''],
              ['TELÉFONO:', { text: this.practica.estudiante.usuario.telefono, colSpan: 3, style: 'tableHeader' }, '', ''],
              [{ text: 'D. DATOS DEL TUTOR ACADÉMICO', colSpan: 4, style: 'tableHeader' }, '', '', ''],
              ['NOMBRE COMPLETO:', { text: nombreInstituto, colSpan: 3, style: 'tableHeader' }, '', ''],
              ['CÉDULA DE IDENTIDAD:', { text: this.practica.tutorInstituto.usuario.cedula, colSpan: 3, style: 'tableHeader' }, '', ''],
              ['CORREO ELECTRÓNICO:', { text: this.practica.tutorInstituto.usuario.correo, colSpan: 3, style: 'tableHeader' }, '', ''],
              [{ text: 'E. PERIODO DE DURACIÓN DE LAS ACTIVIDADES DE PRÁCTICAS PREPROFESIONALES', colSpan: 4, style: 'tableHeader' }, '', '', ''],
              ['TIEMPO DE DURACIÓN (Horas):', { text: '240', colSpan: 3, style: 'tableHeader' }, '', ''],
              ['FECHA DE INICIO:\ndd/mm/aaaa',this.actividades[0].dia, 'FECHA DE FINALIZACIÓN:\ndd/mm/aaaa', this.actividades[this.actividades.length-1].dia],
            ]
          }

        },
        {
          text: '2. DESCRIPCIÓN DE LA EMPRESA/INSTITUCIÓN',
          style: 'subheaderBold',
          margin: [0, 10, 0, 0]
        },
        {
          text: 'Objetivo\n\n' + this.practica.convocatoria.solicitudEmpresa.convenio.empresa.objetivo + '\n\nMisión\n\n' + this.practica.convocatoria.solicitudEmpresa.convenio.empresa.mision+ '\n\nVisión\n\n' + this.practica.convocatoria.solicitudEmpresa.convenio.empresa.vision,
          style: 'subheader',
          margin: [0, 10, 0, 0]
        },
        {
          text: '3. DESCRIPCIÓN DETALLADA DE ACTIVIDADES REALIZADAS',
          style: 'subheaderBold',
          margin: [0, 10, 0, 0]
        },
        {
          ul: this.actividades.map(actividad => `${actividad.dia}: ${actividad.actividad}`),
          margin: [0, 5, 0, 5] 
        },
        {
          text: '4.  EVIDENCIAS' ,
          style: 'subheaderBold',
          margin: [0, 10, 0, 0]
        },
        {
          ul: this.actividadesporsemana.map(semana => 
            `Semana ${semana.semana}
            Desde ${semana.actividades[0].dia} Hasta ${semana.actividades[semana.actividades.length - 1].dia}
            <img src="data:image/png;base64,${this.imagenesSemana}" alt="Imagen de la semana" />
            `),
          
          
          margin: [0, 5, 0, 5] 
        },
      
        {
          text: '5.  CONCLUSIONES',
          style: 'subheaderBold',
          margin: [0, 10, 0, 0]
        },
        {
          text:  this.conclusion,
          style: 'subheader',
          margin: [0, 10, 0, 0]
        },
        {
          text: '6. FIRMAS Y SELLO',
          style: 'subheaderBold',
          margin: [0, 10, 0, 0]
        },
        {
          style: 'table',
          table: {
            widths: ['auto', 'auto', 'auto', 'auto'],
            body: [
              ['', 'ESTUDIANTE', 'TUTOR ACADÉMICO', 'TUTOR ESPECÍFICO'],
              ['Nombre y \napellidos', { text: nomnreEst }, { text: nombreInstituto }, { text: nombreEspecifico }],
              ['Cédula de \nIdentidad.', { text: this.practica.estudiante.usuario.cedula }, { text: this.practica.tutorInstituto.usuario.cedula }, { text: this.practica.tutorEmpresarial.usuario.cedula }],
              ['Firmas \ny \nsellos:', '', '', ''],
            ]
          }
        },
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
        table: {
          margin: [0, 10, 0, 16],
          fontSize: 10,
          font: 'Roboto'
        },
        tableHeader: {
          bold: true
        },
        subheaderBold: {
          fontSize: 11,
          margin: [0, 5, 0, 7],
          bold: true
        },
      }
    };

    
    // Generar el PDF
    const pdfDocGenerator = pdfMake.createPdf(documentDefinition);
    pdfDocGenerator.download('A8_InformeFinal'+this.usuario.apellido+'.pdf');
  }




  buscarEstudiante() {
    this.usuario = JSON.parse(sessionStorage.getItem('userdetails')!);
    this.idUs = this.usuario.id;

    this.estudianteService.buscarxUsuario(this.idUs).subscribe(
      (data: Estudiante) => {
        this.estudiante = data;
        this.obtenerActividades(this.estudiante.id);
        this.buscarPracticas();
      },
      (error) => {
        console.error(error);
      }
    );
  }

  buscarPracticas() {
    this.practicanteServicio.buscarxEstudiante(this.estudiante.id).subscribe(
      (data: Practica) => {
        this.practica = data;
        console.log(data);
        this.practica.id = data.id;
        
      },
      (error) => {
        console.error(error);
      }
    );
    this.loading = false;
  }

}