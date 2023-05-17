import { Component, OnInit } from '@angular/core';
import { TutorAcademico } from 'src/app/core/models/tutor-academico';

//PDF Import
import * as pdfMake from 'pdfmake/build/pdfmake';
/* import pdfFonts from 'pdfmake/build/vfs_fonts'; */
import pdfFonts from 'src/assets/fonts/custom-fonts';
import { PdfMakeWrapper, Txt } from 'pdfmake-wrapper';
import { Empresa } from 'src/app/core/models/empresa';
import { UsersfenixService } from 'src/app/core/services/usersfenix.service';
import { Estudiante } from 'src/app/core/models/estudiante';
import { DocenteFenix } from 'src/app/core/models/docente-fenix';
import { Usuario } from 'src/app/core/models/usuario';
import { ToastrService } from 'ngx-toastr';
import { TutorAcademicoService } from 'src/app/core/services/tutor-academico.service';
import Swal from 'sweetalert2';
import { SolipracticantesService } from 'src/app/core/services/solipracticantes.service';
import { Practicante } from 'src/app/core/models/practicante';
import { ActivatedRoute } from '@angular/router';
import { PracticasService } from 'src/app/core/services/practicas.service';
import { Practica } from 'src/app/core/models/practica';
import { UsuarioService } from 'src/app/core/services/usuario.service';

@Component({
  selector: 'app-reg-tutor',
  templateUrl: './reg-tutor.component.html',
  styleUrls: ['./reg-tutor.component.css']
})
export class RegTutorComponent implements OnInit {

  tutor_academico = new TutorAcademico;
  usuario = new Usuario;

  empresas: Empresa[] = [];
  docentes: DocenteFenix[] = [];
  practicantes: Practicante[] = [];
  responsableppp: Usuario[] = [];
  responsableEmpresa: Usuario[] = [];
  practicante = new Practicante;
  estudiante = new Estudiante;
  practica = new Practica;

  practicanteName: string;
  tutorName: string;
  empresa: string;
  acronimo: string;
  enabledButton: boolean = false;

  docente: DocenteFenix = new DocenteFenix;

  selectedCedula: string;

  blockSpecial: RegExp = /^[^<>*!#@$%^_=+?`\|{}[\]~"'\.\,=abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVQWXYZ/;:]+$/;
  blockCorreo: RegExp = /^[_A-Za-z0-9-\+]+(\.[_A-Za-z0-9-]+)*@[A-Za-z0-9-]+(\.[A-Za-z0-9]+)*(\.[A-Za-z]{2,})$/;
  fechaActual: any;

  constructor(private userService: UsersfenixService, private toastr: ToastrService,
    private tutorService: TutorAcademicoService, private practicanteService: SolipracticantesService, private activatedRoute: ActivatedRoute,
    private practicaService: PracticasService, private usuarioService: UsuarioService) { }

  ngOnInit() {

    this.obtenerPractica();
    this.obtenerResponsableEmpresa();
    this.obtenerResponsablePPP();

    this.userService.listDocente().subscribe(
      docente => {
        this.docentes = docente;
      }
    );

    this.practicanteService.listPracticante().subscribe(
      practicante => {
        this.practicantes = practicante;
      }
    );
  }

  obtenerPractica() {
    this.activatedRoute.params.subscribe(params => {
      let id = params['id']
      if (id) {
        this.practicaService.searchPracticaById(id).subscribe(
          (data: Practica) => {
            this.empresa = data.convocatoria.solicitudEmpresa.convenio.empresa.nombre;
          }
        );
      }
    })
  }

  obtenerResponsablePPP() {
    this.usuarioService.getRoles('ROLE_RESPP').subscribe(
      data => {
        this.responsableppp = data;
      }
    );
  }

  obtenerResponsableEmpresa() {
    this.usuarioService.getRoles('ROLE_TEMP').subscribe(
      data => {
        this.responsableEmpresa = data;
      }
    );
  }

  practicanteId(value) {
    this.practicanteService.searchDocenteById(value).subscribe(
      (data: Practicante) => {
        console.log(data)
        this.usuario.cedula = data.estudiante.usuario.cedula;
        this.usuario.nombre = data.estudiante.usuario.nombre.split(' ')
          .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
          .join(' ');
        this.usuario.apellido = data.estudiante.usuario.apellido.split(' ')
          .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
          .join(' ');
        this.practicanteName = this.usuario.nombre + ' ' + this.usuario.apellido;
        console.log(this.practicanteName)
        /* this.estudiante.usuario.cedula = data.estudiante.usuario.cedula;
        this.estudiante.usuario.nombre = data.estudiante.usuario.nombre;
        this.estudiante.usuario.apellido = data.estudiante.usuario.apellido; */
        this.estudiante.usuario = this.usuario;
        this.practicante.estudiante = this.estudiante;

        console.log(this.practicante);
      }
    )
  }

  docenteCedula(value) {
    this.userService.searchDocenteByCedula(value).subscribe(
      (data: DocenteFenix) => {
        this.tutor_academico.idDocente = data.alumno_docenteId;
        this.usuario.nombre = data.nombres.split(' ')
          .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
          .join(' ');
        this.usuario.apellido = data.apellidos.split(' ')
          .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
          .join(' ');
        this.tutorName = this.usuario.nombre + ' ' + this.usuario.apellido;
        this.usuario.cedula = data.cedula;
        this.usuario.correo = data.correo;
        this.usuario.titulo = data.titulo;
        /* if (this.usuario.titulo.match(/ingenier[ao]/i)) {
          acronimo = 'Ing.';
        } else if (this.usuario.titulo.match(/magister/i)) {
          acronimo = 'Mag.';
        } else if (this.usuario.titulo.match(/abogad[ao]/i)) {
          acronimo = 'Abog.';
        } else if (this.usuario.titulo.match(/lcd[ao]/i)) {
          acronimo = 'Lcd.';
        } else if (this.usuario.titulo.match(/licenciad[ao]/i)) {
          acronimo = 'Lic.';
        } else if (this.usuario.titulo.match(/doctor/i)) {
          acronimo = 'Dr.';
        } else if (this.usuario.titulo.match(/magíster/i)) {
          acronimo = 'Mag.';
        } else if (this.usuario.titulo.match(/tecnolog[ao]/i)) {
          acronimo = 'Tec.';
        } */
        if (this.usuario.titulo.match(/ingeniero/i)) {
          this.acronimo = 'El Ing.';
        } else if (this.usuario.titulo.match(/ingeniera/i)) {
          this.acronimo = 'La Ing.';
        } else if (this.usuario.titulo.match(/magister/i)) {
          this.acronimo = 'El Mgtr.';
        } else if (this.usuario.titulo.match(/abogado/i)) {
          this.acronimo = 'El Abog.';
        } else if (this.usuario.titulo.match(/abogada/i)) {
          this.acronimo = 'La Abog.';
        } else if (this.usuario.titulo.match(/lcdo/i)) {
          this.acronimo = 'El Lcd.';
        } else if (this.usuario.titulo.match(/lcda/i)) {
          this.acronimo = 'La Lcd.';
        } else if (this.usuario.titulo.match(/licenciado/i)) {
          this.acronimo = 'El Lic.';
        } else if (this.usuario.titulo.match(/licenciada/i)) {
          this.acronimo = 'La Lic.';
        } else if (this.usuario.titulo.match(/doctor/i)) {
          this.acronimo = 'El Dr.';
        } else if (this.usuario.titulo.match(/magíster/i)) {
          this.acronimo = 'EL Mag.';
        } else if (this.usuario.titulo.match(/tecnologo/i)) {
          this.acronimo = 'El Tec.';
        } else if (this.usuario.titulo.match(/tecnologa/i)) {
          this.acronimo = 'La Tec.';
        }
        this.usuario.telefono = data.telefono;
        this.usuario.activo = true;
        this.usuario.correo = data.correo;
        this.tutor_academico.usuario = this.usuario;
        console.log(this.tutor_academico)
      }
    )
  }

  registerTutor() {

    if (this.empresa === '' || this.empresa === null) {
      this.toastr.error("Campo Apellidos vacio!", "Error!");
    }

    if (this.tutor_academico.idDocente === undefined || this.tutor_academico.idDocente === null) {
      this.toastr.error("Campo Correo Electrónico vacio!", "Error!");
    }

    /* if (this.usuario.titulo === '' || this.usuario.titulo === null) {
      this.toastr.error("Campo Título vacio!", "Error!");
    }

    if (this.usuario.telefono === '' || this.usuario.telefono === null) {
      this.toastr.error("Campo Número de Teléfono vacio!", "Error!");
    }

    if (this.usuario.password === '' || this.usuario.password === null) {
      this.toastr.error("Campo Contraseña vacio!", "Error!");
    } */

    if (this.empresa === '' || this.empresa === null || this.tutor_academico.idDocente === undefined || this.tutor_academico.idDocente === null) {

      this.toastr.warning("Verifique que esten correctos los campos")
    } else {
      this.tutor_academico.usuario = this.usuario;
      this.tutorService.registerTutor(this.tutor_academico).subscribe(
        (result) => {
          console.log('llego y entro');
          console.log(result);
          Swal.fire('Registro', 'Usuario registrado correctamente', 'success');
          this.enabledButton = true;
          /* this.router.navigate(['/login']) */
        }
      );
    };
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
      new Txt('Luego de expresarle un atento saludo me permito informar que ' + this.acronimo + ' ' + this.tutorName + ' con cédula de identidad número: ' + this.usuario.cedula + ' ha sido designado como TUTOR ESPECIFICO del estudiante ' + this.practicanteName + '.')
        .fontSize(11)
        .margin([0, 0, 0, 10])
        .end
    );

    pdf.add(
      new Txt('\n\n' + this.acronimo + ' ' + this.tutorName + ' se compromete a colaborar y guiar en las actividades que se encomienden al estudiante procurando siempre un ambiente laboral óptimo para la ejecución de las prácticas pre profesionales.')
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