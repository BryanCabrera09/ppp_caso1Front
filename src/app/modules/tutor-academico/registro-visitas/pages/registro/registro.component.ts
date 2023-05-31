import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Estudiante } from 'src/app/core/models/estudiante';
import { Practica } from 'src/app/core/models/practica';
import { TutorAcademico } from 'src/app/core/models/tutor-academicoRS';
import { Usuario } from 'src/app/core/models/usuario';
import { Visita } from 'src/app/core/models/visita';
import { VisitaActividad } from 'src/app/core/models/visita-actividad';
import { PracticasService } from 'src/app/core/services/practicas.service';
import { TutorAcademicoService } from 'src/app/core/services/tutor-academico.service';
import * as pdfMake from 'pdfmake/build/pdfmake';
import * as pdfFonts from 'pdfmake/build/vfs_fonts';

pdfMake.vfs = pdfFonts.pdfMake.vfs;

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {

  acvisita = new VisitaActividad;
  visita = new Visita;
  tutoraca =new TutorAcademico;
  estudiante = new Estudiante;
  

  practica: any;

  Practicas:Practica[]=[];

  usuario = new Usuario;
  user: Usuario;
  idUs: any;
  constructor(private route: ActivatedRoute, private acvisitaService: VisitaActividad, private visitaService: Visita,private userl: TutorAcademicoService
    ,private practicanteServicio :PracticasService
    ) { }

  ngOnInit() {
    this.user = JSON.parse(sessionStorage.getItem('userdetails') || "");
    this.route.queryParams.subscribe(params => {
      this.practica = JSON.parse(params['practica']);
      console.log("practica: " + this.practica);
      this.estudiante = this.practica.estudiante;
      console.log(this.estudiante)
      console.log(this.practica);
    });
  }

  tutoruser(){
    this.usuario = JSON.parse(sessionStorage.getItem('userdetails')!);
    this.idUs = this.usuario.id;
    this.userl.buscarxusuario(this.idUs).subscribe(
      (data:TutorAcademico) => {
        this.tutoraca.id=data.id;
        

      }
      )
  }

  pxt(){
    this.practicanteServicio.listarByTistaUsuario(this.tutoraca.id).subscribe(
      practica=>{
        this.Practicas=practica.map(
          resul=>{
            let practicas = new Practica;
            practicas=resul
          }
        )
      }
    )
  }

  async generarPdf(){


    
    const fecha = new Date();
    const options: any = {

      year: 'numeric',
      month: 'long',
      day: 'numeric'
    };

    const imageData = await this.getBase64ImageFromAssets("assets/images/Logo-ISTA.png");

    const formatter = new Intl.DateTimeFormat('es-EC', options);
    const fechaFormateada = formatter.format(fecha);
    const fechaCompleta = `Cuenca, ${fechaFormateada}`;

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
          text: 'INSTITUTO SUPERIOR UNIVERSITARIO TECNOLÓGICO DEL AZUAY \nTECNOLOGÍA SUPERIOR EN DESARROLLO DE SOFTWARE \nANEXO 5 \REGISTRO DE VISITA A EMPRESA FORMADORA RECEPTORA',
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
          text: '1.  Datos Informativos:',
          style: 'subheaderBold',
          margin: [0, 10, 0, 0]
        },
        {
          style: 'table',
          table: {
            widths: ['auto', '*', '*', '*'],
            body: [

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
          text: 'Objetivo\n\n' + this.practica.convocatoria.solicitudEmpresa.convenio.empresa.objetivo + '\n\nMisión\n\n' + this.practica.convocatoria.solicitudEmpresa.convenio.empresa.mision,
          style: 'subheader',
          margin: [0, 10, 0, 0]
        },
        {
          text: '4.  EVIDENCIAS' ,
          style: 'subheaderBold',
          margin: [0, 10, 0, 0]
        },
        {
          text: 'Lista y descripción de las evidencias presentadas\n' + '(Fotografías, capturas de pantalla, informes, diagramas, documentación, etc.)',
          style: 'subheader',
          margin: [0, 10, 0, 0]
        },
        {
          text: '5.  CONCLUSIONES',
          style: 'subheaderBold',
          margin: [0, 10, 0, 0]
        },
        {
          text:  this.practica.concluciones,
          style: 'subheader',
          margin: [0, 10, 0, 0]
        },
        {
          text: '6. FIRMAS Y SELLO',
          style: 'subheaderBold',
          margin: [0, 10, 0, 0]
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

    const pdfDocGenerator = pdfMake.createPdf(documentDefinition);
    pdfDocGenerator.download('A8_InformeFinal.pdf');

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

  
}
