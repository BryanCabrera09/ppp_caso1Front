import { Component, OnInit } from '@angular/core';
import { TutorAcademico } from 'src/app/core/models/tutor-academico';

//PDF Import
import * as pdfMake from 'pdfmake/build/pdfmake';
/* import pdfFonts from 'pdfmake/build/vfs_fonts'; */
import pdfFonts from 'src/assets/fonts/custom-fonts';
import { PdfMakeWrapper, Txt } from 'pdfmake-wrapper';
import { Empresa } from 'src/app/core/models/empresa';
import { RegEmpresaServiceService } from 'src/app/core/services/reg-empresa-service.service';


@Component({
  selector: 'app-reg-tutor',
  templateUrl: './reg-tutor.component.html',
  styleUrls: ['./reg-tutor.component.css']
})
export class RegTutorComponent implements OnInit {

  tutor_academico = new TutorAcademico;

  empresas: Empresa[] = [];

  blockSpecial: RegExp = /^[^<>*!#@$%^_=+?`\|{}[\]~"'\.\,=abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVQWXYZ/;:]+$/;
  blockCorreo: RegExp = /^[_A-Za-z0-9-\+]+(\.[_A-Za-z0-9-]+)*@[A-Za-z0-9-]+(\.[A-Za-z0-9]+)*(\.[A-Za-z]{2,})$/;
  fechaActual: any;

  constructor(private empresaService: RegEmpresaServiceService) { }

  ngOnInit() {

    this.empresaService.obtenerempresas().subscribe(
      empresa => {
        this.empresas = empresa
      }
    );
  }

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

    //Tipo de letra 
    PdfMakeWrapper.setFonts(pdfFonts, {
      calibri: {
        normal: 'Calibri-Regular.ttf',
        bold: 'Calibri-Bold.TTF',
        italics: 'Calibri-Italic.ttf',
        bolditalics: 'Calibri-Bold-Italic.ttf'
      },
    });

    PdfMakeWrapper.useFont('calibri');

    // definir las márgenes del documento
    var marginLeft = 74;
    var marginRight = 74;
    var marginTop = 70;
    var marginBottom = 100;

    /* const documentDefinition = {
      pageSize: 'A4',
      pageMargins: [marginLeft, marginTop, marginRight, marginBottom],
      content: [
        {
          image: imageData,
          width: 170,
          height: 50,
          alignment: "left",
          margin: [0, 20, 0, 20],
        },
        {
          text: 'Documento: Designación tutor especifico',
          style: 'header'
        },
        {
          text: fechaCompleta,
          style: 'subheader',
          alignment: 'right'
        },
        {
          text: '\nMagíster\nJUAN ESPINOZA\nRESPONSABLE DE PRÁCTICAS PRE PROFESIONALES DE LA CARRERA DE TECNOLOGÍA SUPERIOR EN DESARROLLO DE SOFTWARE\nINSTITUTO SUPERIOR UNIVERSITARIO TECNOLÓGICO DEL AZUAY\n\nSu Despacho. -',
          style: 'body'
        },
        {
          text: 'De mi consideración:',
          style: 'subheader'
        },
        {
          text: '\nLuego de expresarle un atento saludo me permito informar que el Ing. Patricio Leonardo Pacheco Quezada con cédula de identidad número: 0103629762 ha sido designado como TUTOR ESPECIFICO del estudiante Juan Carlos Matute Uzhca.',
          style: 'body'
        },
        {
          text: '\n\nEl Ing. Leonardo Patricio Pacheco Quezada se compromete a colaborar y guiar en las actividades que se encomienden al estudiante procurando siempre un ambiente laboral óptimo para la ejecución de las prácticas pre profesionales.',
          style: 'body'
        },
        {
          text: '\n\nSin más que informar, me despido augurando éxito en las funciones que realiza.',
          style: 'body'
        },
        {
          text: '\n\nAtentamente,',
          style: 'subheader'
        },
        {
          text: '\n\n\n\n_______________________\nIng. Patricio Pacheco\nGERENTE GENERAL\nGesinsoft Cia. Ltda.',
          style: 'body'
        }
      ],
      styles: {
        calibri: {
          normal: 'Calibri-Regular.ttf',
          bold: 'Calibri-Bold.ttf',
          italics: 'Calibri-Italic.ttf',
          bolditalics: 'Calibri-Bold-Italic.ttf'
        },
        header: {
          fontSize: 11,
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
          alignment: 'justify'
        }
      }
    };

    pdfMake.createPdf(documentDefinition).download('designacion-tutor-especifico.pdf'); */

    const pdf = new PdfMakeWrapper();

    pdf.pageMargins([marginLeft, marginTop, marginRight, marginBottom]);

    pdf.images({
      image: imageData,
      width: "170",
      height: "50",
      alignment: 'left',
      margin: "0 20"
    });

    pdf.add(
      new Txt('Documento: Designación tutor especifico')
        .bold()
        .fontSize(11)
        .margin([0, 0, 0, 10])
        .end
    );

    pdf.add(
      new Txt(fechaCompleta)
        .fontSize(11)
        .alignment('right')
        .margin([0, 10, 0, 5])
        .end
    );

    pdf.add(
      new Txt('\nMagíster\nJUAN ESPINOZA\nRESPONSABLE DE PRÁCTICAS PRE PROFESIONALES DE LA CARRERA DE TECNOLOGÍA SUPERIOR EN DESARROLLO DE SOFTWARE\nINSTITUTO SUPERIOR UNIVERSITARIO TECNOLÓGICO DEL AZUAY\n\nSu Despacho. -')
        .fontSize(11)
        .margin([0, 0, 0, 10])
        .end
    );

    pdf.add(
      new Txt('De mi consideración:')
        .fontSize(11)
        .margin([0, 10, 0, 5])
        .end
    );

    pdf.add(
      new Txt('Luego de expresarle un atento saludo me permito informar que el Ing. Patricio Leonardo Pacheco Quezada con cédula de identidad número: 0103629762 ha sido designado como TUTOR ESPECIFICO del estudiante Juan Carlos Matute Uzhca.')
        .fontSize(11)
        .margin([0, 0, 0, 10])
        .end
    );

    pdf.add(
      new Txt('\n\nEl Ing. Leonardo Patricio Pacheco Quezada se compromete a colaborar y guiar en las actividades que se encomienden al estudiante procurando siempre un ambiente laboral óptimo para la ejecución de las prácticas pre profesionales.')
        .fontSize(11)
        .margin([0, 0, 0, 10])
        .end
    );

    pdf.add(
      new Txt('\n\nSin más que informar, me despido augurando éxito en las funciones que realiza.')
        .fontSize(11)
        .margin([0, 0, 0, 10])
        .end
    );

    pdf.add(
      new Txt('\n\nAtentamente,')
        .fontSize(11)
        .style('subheader')
        .end
    );

    pdf.add(
      new Txt('\n\n\n\n_______________________\nIng. Patricio Pacheco\nGERENTE GENERAL\nGesinsoft Cia. Ltda.')
        .fontSize(11)
        .style('body')
        .end
    );

    //pdf.create().open();
    pdf.pageSize('A4');
    // Opcional: Descargar el documento PDF
    pdf.create().download('designacion-tutor-especifico.pdf');
  }

}
