import { Component, OnInit } from '@angular/core';
import { TutorInstituto } from 'src/app/core/models/tutor-academico';

//PDF Import
import * as pdfMake from 'pdfmake/build/pdfmake';
/* import pdfFonts from 'pdfmake/build/vfs_fonts'; */
import pdfFonts from 'src/assets/fonts/custom-fonts';
import { Img, PdfMakeWrapper, Txt } from 'pdfmake-wrapper';
import { Empresa } from 'src/app/core/models/empresa';
import { UsersfenixService } from 'src/app/core/services/usersfenix.service';
import { Estudiante } from 'src/app/core/models/estudiante';
import { DocenteFenix } from 'src/app/core/models/docente-fenix';
import { Usuario } from 'src/app/core/models/usuario';
import { ToastrService } from 'ngx-toastr';
import Swal from 'sweetalert2';
import { SolipracticantesService } from 'src/app/core/services/solipracticantes.service';
import { Practicante } from 'src/app/core/models/practicante';
import { ActivatedRoute } from '@angular/router';
import { PracticasService } from 'src/app/core/services/practicas.service';
import { Practica } from 'src/app/core/models/practica';
import { UsuarioService } from 'src/app/core/services/usuario.service';
import { TutorEmpresarial } from 'src/app/core/models/tutor-empresarial';
import { TutorEmpresarialService } from 'src/app/core/services/tutor-empresarial.service';

@Component({
  selector: 'app-reg-tutor',
  templateUrl: './reg-tutor.component.html',
  styleUrls: ['./reg-tutor.component.css']
})
export class RegTutorComponent implements OnInit {

  tutorEmpresarial = new TutorEmpresarial;
  usuario = new Usuario;
  practicante = new Practicante;
  estudiante = new Estudiante;
  practica = new Practica;
  empresa = new Empresa;

  empresas: Empresa[] = [];
  practicantes: Practicante[] = [];
  responsableppp: Usuario[] = [];
  responsableEmpresa: Usuario[] = [];

  practicanteName: string;
  tutorName: string;
  selectedResponsable: string;
  selectedPracticante: string;
  selectedRol: string;

  acronimo: string;
  enabledButton: boolean = false;
  gerenteGeneral: string;

  role: string;
  nombre: string;
  apellido: string;

  selectedCedula: string;
  idConvo: number;

  rol: string[] = [
    'Gerente Empresa', 'Tutor Especifico'
  ];

  blockSpecial: RegExp = /^[^<>*!#@$%^_=+?`\|{}[\]~"'\.\,=abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVQWXYZ/;:]+$/;
  fechaActual: any;

  expCorreo: RegExp = /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/;
  valCorreo: boolean = true;

  constructor(private userService: UsersfenixService, private toastr: ToastrService,
    private tutorService: TutorEmpresarialService, private practicanteService: SolipracticantesService, private activatedRoute: ActivatedRoute,
    private practicaService: PracticasService, private usuarioService: UsuarioService) { }

  ngOnInit() {

    this.obtenerPractica();
    this.obtenerResponsableEmpresa();
    this.obtenerResponsablePPP();
    this.obtenerTutorAcademico();
  }

  obtenerPractica() {
    this.activatedRoute.params.subscribe(params => {
      let id = params['id']
      if (id) {
        this.practicaService.searchPracticaById(id).subscribe(
          (data: Practica) => {
            this.empresa.nombre = data.convocatoria.solicitudEmpresa.convenio.empresa.nombre;
            this.empresa.id = data.convocatoria.solicitudEmpresa.convenio.empresa.id;
            this.empresa.matriz = data.convocatoria.solicitudEmpresa.convenio.empresa.matriz;
            this.empresa.mision = data.convocatoria.solicitudEmpresa.convenio.empresa.mision;
            this.empresa.objetivo = data.convocatoria.solicitudEmpresa.convenio.empresa.objetivo;
            this.empresa.activo = data.convocatoria.solicitudEmpresa.convenio.empresa.activo;
            this.empresa.ruc = data.convocatoria.solicitudEmpresa.convenio.empresa.ruc;
            this.empresa.vision = data.convocatoria.solicitudEmpresa.convenio.empresa.vision;

            this.idConvo = data.convocatoria.id;
            this.practicanteService.practicanteByConvoId(this.idConvo).subscribe(
              practicante => {
                this.practicantes = practicante;
              }
            )
          }
        );
      }
    })
  }

  obtenerResponsablePPP() {
    this.usuarioService.getRoles('ROLE_TISTA').subscribe(
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

  obtenerTutorAcademico() {
    this.usuarioService.getRoles('ROLE_TISTA').subscribe(
      data => {
        this.responsableEmpresa = data;
      }
    );
  }

  practicanteId(value) {
    this.practicanteService.searchPracticanteById(value).subscribe(
      (data: Practicante) => {
        console.log(data)
        this.usuario.cedula = data.estudiante.usuario.cedula;
        this.nombre = data.estudiante.usuario.nombre;
        this.apellido = data.estudiante.usuario.apellido;
        this.practicanteName = data.estudiante.usuario.nombre.split(' ')
          .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
          .join(' ') + ' ' + data.estudiante.usuario.apellido.split(' ')
            .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
            .join(' ');
        console.log(this.practicanteName)
        this.estudiante.usuario = this.usuario;
        this.practicante.estudiante = this.estudiante;

        console.log(this.practicante);
      }
    )
  }

  gerenteEmpresa(value) {
    this.gerenteGeneral = value;
  }

  validarCorreo() {
    this.valCorreo = this.expCorreo.test(this.usuario.correo!);
    if (this.valCorreo) {
    }
  }

  responsableCedula(value) {
    this.userService.searchDocenteByCedula(value).subscribe(
      (data: DocenteFenix) => {
        this.usuario.nombre = data.nombres;
        this.usuario.apellido = data.apellidos;
        this.tutorName = data.nombres.split(' ')
          .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
          .join(' '); + ' ' + data.apellidos.split(' ')
            .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
            .join(' ');;
        this.usuario.cedula = data.cedula;
        this.usuario.correo = data.correo;
        this.usuario.titulo = data.titulo;
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
        this.tutorEmpresarial.usuario = this.usuario;
        console.log(this.tutorEmpresarial)
      }
    )
  }

  registerTutor() {

    if (this.tutorEmpresarial.cargo === '' || this.tutorEmpresarial.cargo === null) {
      this.toastr.error("Campo Cargo Vacio!", "Error!");
    }

    if (this.usuario.cedula === '' || this.usuario.cedula === null) {
      this.toastr.error("Campo Cédula vacio!", "Error!");
    }

    if (this.usuario.nombre === '' || this.usuario.nombre === null) {
      this.toastr.error("Campo Nombres vacio!", "Error!");
    }

    if (this.usuario.apellido === '' || this.usuario.apellido === null) {
      this.toastr.error("Campo Apellidos vacio!", "Error!");
    }

    if (this.usuario.correo === '' || this.usuario.correo === null) {
      this.toastr.error("Campo Correo Electrónico vacio!", "Error!");
    }

    if (this.usuario.titulo === '' || this.usuario.titulo === null) {
      this.toastr.error("Campo Título vacio!", "Error!");
    }

    if (this.usuario.telefono === '' || this.usuario.telefono === null) {
      this.toastr.error("Campo Número de Teléfono vacio!", "Error!");
    }

    if (this.usuario.password === '' || this.usuario.password === null) {
      this.toastr.error("Campo Contraseña vacio!", "Error!");
    }

    if (this.selectedPracticante === undefined || this.selectedPracticante === null) {
      this.toastr.error("Seleccione un Practicante!", "Error!");
    }

    if (this.selectedResponsable === '' || this.selectedResponsable === null) {
      this.toastr.error("Seleccione un Responsable!", "Error!");
    }

    if (this.selectedRol === '' || this.selectedRol === null) {
      this.toastr.error("Asigne un Rol!", "Error!");
    }

    if (this.usuario.nombre === '' || this.usuario.apellido === '' || this.usuario.correo === '' || this.usuario.cedula === '' || this.usuario.password === '' || this.usuario.titulo === '' || this.usuario.telefono === ''
      || this.usuario.nombre === null || this.usuario.apellido === null || this.usuario.correo === null || this.usuario.cedula === null || this.usuario.password === null || this.usuario.titulo === null || this.usuario.telefono === null || !this.valCorreo
      || this.selectedRol === '' || this.selectedRol === null || this.empresa.nombre === '' || this.empresa === null
      || this.tutorEmpresarial.cargo === undefined || this.tutorEmpresarial.cargo === null) {

      this.toastr.warning("Verifique que esten correctos los campos")
    } else {
      this.usuario.activo = true;
      this.tutorEmpresarial.usuario = this.usuario;
      this.tutorEmpresarial.empresa = this.empresa;
      if (this.selectedRol === 'Tutor Especifico') {
        this.role = 'ROLE_TEMP';
      } else if (this.selectedRol === 'Gerente Empresa') {
        this.role = 'ROLE_GEREN';
      }
      this.tutorService.registerTutor(this.tutorEmpresarial, this.role).subscribe(
        (result: TutorInstituto) => {
          this.activatedRoute.params.subscribe(params => {
            let id = params['id']
            if (id) {
              this.practicaService.searchPracticaById(id).subscribe(
                (data: Practica) => {
                  this.practica.id = data.id;
                  this.practica.concluciones = data.concluciones;
                  this.practica.convocatoria = data.convocatoria;
                  this.practica.departamento = data.departamento;
                  this.practica.estudiante = data.estudiante;
                  this.practica.fin = data.fin;
                  this.practica.inicio = data.inicio;
                  this.practica.nsemanas = data.nsemanas;
                  this.practica.periodo = data.periodo;
                  this.practica.estado = data.estado;
                  this.practica.tutorInstituto = data.tutorInstituto;

                  this.tutorEmpresarial.id = result.id;
                  this.practica.tutorEmpresarial = this.tutorEmpresarial;
                  console.log(this.practica);
                  this.practicaService.editarPractica(id, this.practica)
                    .subscribe(
                      resultprac => {
                        console.log(resultprac);
                        this.enabledButton = true;
                        if (this.selectedRol === 'Tutor Especifico') {
                          Swal.fire('Registro', 'Tutor Especfico Creado', 'success');
                        } else if (this.selectedRol === 'Gerente Empresa') {
                          Swal.fire('Registro', 'Gerente Empresa Creado', 'success');
                        }
                        /* this.router.navigate(['/login']) */
                      }
                    );
                }
              );
            }
          })
        }
      );
    };
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

    const pdf = new PdfMakeWrapper();

    pdf.pageMargins([marginLeft, marginTop, marginRight, marginBottom]);

    /* pdf.add(
      new Img(imageData)
        .width(170)
        .height(50)
        .alignment('left')
        .margin([0, 20])
        .build()
    ); */

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
      new Txt('\n\n\n\n_______________________\nIng. Patricio Pacheco\nGERENTE GENERAL\n' + this.empresa)
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