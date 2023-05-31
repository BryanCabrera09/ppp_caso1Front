import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Convenio } from 'src/app/core/models/convenio';
import { DocenteFenix } from 'src/app/core/models/docente-fenix';
import { Empresa } from 'src/app/core/models/empresa';
import { Estudiante } from 'src/app/core/models/estudiante';
import { Practica } from 'src/app/core/models/practica';
import { Practicante } from 'src/app/core/models/practicante';
import { TutorInstituto } from 'src/app/core/models/tutor-academico';
import { Usuario } from 'src/app/core/models/usuario';
import { PracticasService } from 'src/app/core/services/practicas.service';
import { SolipracticantesService } from 'src/app/core/services/solipracticantes.service';
import { TutorAcademicoService } from 'src/app/core/services/tutor-academico.service';
import { UsersfenixService } from 'src/app/core/services/usersfenix.service';
import { UsuarioService } from 'src/app/core/services/usuario.service';
import Swal from 'sweetalert2';

import * as pdfMake from 'pdfmake/build/pdfmake';
import * as pdfFonts from 'pdfmake/build/vfs_fonts';
import { HttpResponse } from '@angular/common/http';
import { AnexosService } from 'src/app/core/services/anexos.service';
import { Anexos } from 'src/app/core/models/anexos';

@Component({
  selector: 'app-tutor-academico',
  templateUrl: './tutor-academico.component.html',
  styleUrls: ['./tutor-academico.component.css']
})
export class TutorAcademicoComponent implements OnInit {

  tutorInstituto = new TutorInstituto;
  usuario = new Usuario;
  convenio = new Convenio;

  empresas: Empresa[] = [];
  docentes: DocenteFenix[] = [];
  practicantes: Practicante[] = [];
  responsableppp: Usuario[] = [];
  responsableEmpresa: Usuario[] = [];

  practicante = new Practicante;
  estudiante = new Estudiante;
  practica = new Practica;
  anexo = new Anexos;
  docente = new DocenteFenix;

  practicanteName: string;
  tutorName: string;
  empresa: string;
  acronimo: string;

  enabledButton: boolean;
  displayEU: boolean;
  datosExistentes: boolean;
  entrPrac: boolean;

  selectedDocente: string;
  selectedPracticante: string;
  idConvo: number;
  role: string;
  nombre: string;
  apellido: string;

  archivo: File;
  id: number;

  blockSpecial: RegExp = /^[^<>*!#@$%^_=+?`\|{}[\]~"'\.\,=abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVQWXYZ/;:]+$/;
  blockCorreo: RegExp = /^[_A-Za-z0-9-\+]+(\.[_A-Za-z0-9-]+)*@[A-Za-z0-9-]+(\.[A-Za-z0-9]+)*(\.[A-Za-z]{2,})$/;
  fechaActual: any;

  constructor(private userService: UsersfenixService, private toastr: ToastrService, private router: Router,
    private tutorService: TutorAcademicoService, private practicanteService: SolipracticantesService, private activatedRoute: ActivatedRoute,
    private practicaService: PracticasService, private usuarioService: UsuarioService, private anexoService: AnexosService) { }

  ngOnInit() {

    this.obtenerPractica();
    this.obtenerResponsableEmpresa();
    this.obtenerResponsablePPP();

    this.userService.listDocente().subscribe(
      docente => {
        this.docentes = docente;
      }
    );
  }

  onFileChange(event: any) {
    this.archivo = event.target.files[0];
  }

  updatePDF() {

    this.anexo.tipo = 1;
    this.anexo.practica = this.practica;
    this.anexoService.registerAnexo(this.anexo).subscribe(
      (response: Anexos) => {
        this.id = response.id;
        this.anexoService.guardarPDF(this.archivo, this.id).subscribe(
          (response: any) => {
            Swal.fire('Registro', 'PDF actualizado correctamente', 'success');
            this.reloadPage();
          },
          (error) => {
            console.error('Error al actualizar el PDF', error);
            Swal.fire('Registro', 'Error al subir el PDF', 'error');
          }
        );
        this.toastr.success("Anexo Creado", "Anexo");
      },
      (error) => {
        this.toastr.error("Error al Crear Anexo", "Anexo");
      }
    );
  }

  reloadPage() {
    window.location.reload();
  }

  descargarPDF(value) {
    this.anexoService.obtenerPDF(value).subscribe(response => {
      const filename = this.getFilenameFromResponse(response);
      this.downloadFile(response.body, filename);
    });
  }

  private getFilenameFromResponse(response: HttpResponse<Blob>): string {
    const contentDispositionHeader = response.headers.get('Content-Disposition');
    const matches = /filename[^;=\n]=((['"]).?\2|[^;\n]*)/.exec(contentDispositionHeader);
    if (matches != null && matches[1]) {
      return matches[1].replace(/['"]/g, '');
    }
    return 'tutor-academico.pdf';
  }

  private downloadFile(data: Blob, filename: string) {
    const blob = new Blob([data], { type: 'application/pdf' });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    link.click();
    window.URL.revokeObjectURL(url);
  }

  obtenerPractica() {
    this.activatedRoute.params.subscribe(params => {
      let id = params['id']
      if (id) {
        this.practicaService.searchPracticaById(id).subscribe(
          (data: Practica) => {
            this.practica = data;
            this.empresa = data.convocatoria.solicitudEmpresa.convenio.empresa.nombre;
            this.idConvo = data.convocatoria.id;
            this.practicanteService.practicanteByConvoId(this.idConvo).subscribe(
              practicante => {
                this.practicantes = practicante;
                this.entrPrac = true;
                this.buscarAnexo();
              }
            )
          }
        );
      }
    })
  }

  buscarAnexo() {
    this.anexoService.listarPorTipo(this.practica.id, 1).subscribe(
      (data: Anexos) => {
        this.anexo = data;
        this.datosExistentes = true;
        console.log(this.anexo);
      }
    );
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

  docenteCedula(value) {
    this.userService.searchDocenteByCedula(value).subscribe(
      (data: DocenteFenix) => {
        this.tutorInstituto.idDocente = data.alumno_docenteId;
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
        this.tutorInstituto.usuario = this.usuario;
        console.log(this.tutorInstituto);
      }
    )
  }

  registerTutor() {

    if (this.selectedDocente === undefined || this.selectedDocente === null) {
      this.toastr.error("Seleccione un Docente!", "Error!");
    }

    if (this.selectedPracticante === undefined || this.selectedPracticante === null) {
      this.toastr.error("Seleccione un Practicante!", "Error!");
    }

    if (this.usuario.password === undefined || this.usuario.password === null) {
      this.toastr.error("Establesca Una Contraseña!", "Error!");
    }

    if (this.usuario.password === undefined || this.usuario.password === null || this.empresa === '' || this.empresa === null || this.tutorInstituto.idDocente === undefined || this.tutorInstituto.idDocente === null || this.selectedDocente === '' || this.selectedDocente === null
      || this.selectedPracticante === '' || this.selectedPracticante === null) {

      this.toastr.warning("Verifique que esten correctos los campos")
    } else {
      this.tutorInstituto.usuario = this.usuario;
      this.role = 'ROLE_TISTA';
      this.tutorService.registerTutor(this.tutorInstituto, this.role).subscribe(
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

                  this.tutorInstituto.id = result.id;
                  this.id = result.id;
                  console.log(this.id)

                  this.practica.tutorInstituto = this.tutorInstituto;
                  console.log(this.practica);
                  this.practicaService.editarPractica(id, this.practica)
                    .subscribe(
                      resultprac => {
                        console.log(resultprac);
                        this.enabledButton = true;
                        Swal.fire('Registro', 'Tutor Academico Creado', 'success');
                        this.generarPDF();
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
          text: 'ANEXO 4: Designación y obligaciones del tutor académico',
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
          text: '\nMagíster\n' + this.tutorName + '\nDOCENTE\nINSTITUTO SUPERIOR TECNOLÓGICO DEL AZUAY\nSu Despacho. -\n\nDe mi consideración:',
          style: 'body',
          lineHeight: 1.5
        },
        {
          text: ['Luego de expresarle un atento saludo y desearle éxito en las funciones que acertadamente realiza, me permito informarle que ha sido designado como ',
            { text: 'TUTOR ACADÉMICO', style: "bold" }, ' del estudiante ' + this.practicanteName + ' para la ejecución de las prácticas pre profesionales en la empresa ' + this.empresa + '.\n\nAgradezco de antemano su valiosa colaboración con esta importante actividad.'],
          style: 'body'
        },
        {
          text: '\n\nAtentamente,',
          style: 'subheader'
        },
        {
          text: '\n\n\n\n_______________________\nIng. Juan Espinoza. Mgtr.\nResponsable de Prácticas Pre Profesionales\nCARRERA DE TECNOLOGÍA SUPERIOR EN DESARROLLO DE SOFTWARE\nINSTITUTO SUPERIOR UNIVERSITARIO TECNOLÓGICO DEL AZUAY',
          style: 'body'
        },
        {
          text: '\n\n\nNOTA:',
          style: 'body'
        },
        {
          text: 'Recordarle al tutor que está sujeto a las siguientes obligaciones:',
          style: 'body'
        },
        {
          type: 'lower-alpha',
          ol: [
            'Acompañar al estudiante en su formación práctica en el entorno laboral real, según la planificación establecida por la IES, en coordinación con el tutor general. El acompañamiento incluye la orientación pedagógica al estudiante y el monitoreo de su desempeño, como también del proceso de formación en sentido general, sobre la base de lo establecido en los instrumentos de implementación de la modalidad de formación dual, indicados en el presente Reglamento;',
            'Reportar de manera oportuna al coordinador de la carrera o programa las faltas disciplinarias en que incurrieren los estudiantes en el entorno laboral real, así como otras incidencias ocurridas durante el proceso de formación en la entidad receptora formadora;',
            'Contribuir a la cooperación y el diálogo entre la IES y la respectiva entidad receptora formadora;',
            'Desarrollar su labor como tutor de manera conjunta y coordinada con el tutor específico, incluido el apoyo a los estudiantes en el diseño y desarrollo del proyecto empresarial de cada periodo académico;',
            'Entregar a la IES y a la entidad receptora formadora la documentación que se le indique sobre el proceso de formación en el entorno laboral real; y',
            'Mantener actualizado el expediente del estudiante que recoge las evidencias sobre su proceso de formación en el entorno laboral real, con los documentos que le indique la IES. El tutor académico es responsable de facilitar los documentos (en versión digital y/o impresa) correspondientes a los Anexos para el seguimiento del proceso de formación dual que constan en el INSTRUCTIVO PARA EL DESARROLLO DE PRÁCTICAS PREPROFESIONALES, tanto al estudiante como al tutor empresarial; y será custodio de los mismos hasta que estos sean entregados oportunamente a la Coordinación de la Carrera.'
          ],
          style: 'body',
          marginLeft: 25
        },
        {
          text: [
            '\n',
            '\n',
            '\n',
            '\n',
            '\n',
            '________________________________________ \n',
            'Firma Tutor Académico'
          ],
          style: 'firma',
          alignment: "center"
        }

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
        bold: {
          bold: true,
        },
      }
    };

    pdfMake.createPdf(documentDefinition).download('anexo4.pdf');

    this.displayEU = true;
  }
}