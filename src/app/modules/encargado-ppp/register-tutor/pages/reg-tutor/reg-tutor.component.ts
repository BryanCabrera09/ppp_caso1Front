import { Component, OnInit } from '@angular/core';
import { TutorInstituto } from 'src/app/core/models/tutor-academico';

//PDF Import
import * as pdfMake from 'pdfmake/build/pdfmake';
import * as pdfFonts from 'pdfmake/build/vfs_fonts';
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
  cedula: string;
  displayEU: boolean;

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
      console.log(id)
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
        this.cedula = data.estudiante.usuario.cedula;
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

  cambiarAcronico() {
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
      this.role = 'ROLE_GEREN';
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
                        Swal.fire('Registro', 'Gerente Empresa Creado', 'success');
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
          text: 'Documento: Designación tutor especifico',
          style: 'header',
          lineHeight: 1.5
        },
        {
          text: fechaCompleta,
          style: 'subheader',
          alignment: 'right',
          margin: [0, -10, 0, 0]
        },
        {
          text: '\n\nMagíster\nJUAN ESPINOZA\nRESPONSABLE DE PRÁCTICAS PRE PROFESIONALES DE LA CARRERA DE TECNOLOGÍA SUPERIOR EN DESARROLLO DE SOFTWARE\nINSTITUTO SUPERIOR UNIVERSITARIO TECNOLÓGICO DEL AZUAY\n\nSu Despacho. -',
          style: 'body'
        },
        {
          text: 'De mi consideración:',
          style: 'subheader'
        },
        {
          text: ['\nLuego de expresarle un atento saludo me permito informar que ' + this.acronimo + ' ' + this.usuario.nombre + ' ' + this.usuario.apellido + ' con cédula de identidad número: ' + this.usuario.cedula + ' ha sido designado como ',
          { text: 'TUTOR ESPECIFICO', style: "bold" }, ' del estudiante ' + this.practicanteName + '.'],
          style: 'body',
        },
        {
          text: '\n\n' + this.acronimo + ' ' + this.usuario.nombre + ' ' + this.usuario.apellido + ' se compromete a colaborar y guiar en las actividades que se encomienden al estudiante procurando siempre un ambiente laboral óptimo para la ejecución de las prácticas pre profesionales.',
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
          text: '\n\n\n\n_______________________\nIng. Patricio Pacheco\nGERENTE GENERAL\n' + this.empresa.nombre,
          style: 'body'
        }
      ],
      styles: {
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
          alignment: 'justify',
          lineHeight: 1.15
        },
        bold: {
          bold: true,
        },
      }
    };

    pdfMake.createPdf(documentDefinition).download('designacion-tutor-especifico.pdf');
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
}