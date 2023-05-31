import { HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import * as pdfMake from 'pdfmake/build/pdfmake';
import * as pdfFonts from 'pdfmake/build/vfs_fonts';
import { Actividad } from 'src/app/core/models/actividad';
import { SolicitudEmpresa } from 'src/app/core/models/solicitud-empresa';
import { ActividadpService } from 'src/app/core/services/actividadp.service';
import { SoliEmpresaService } from 'src/app/core/services/soli-empresa.service';
import Swal from 'sweetalert2';

pdfMake.vfs = pdfFonts.pdfMake.vfs;

@Component({
  selector: 'app-ver-empresa',
  templateUrl: './ver-empresa.component.html',
  styleUrls: ['./ver-empresa.component.css']
})
export class VerEmpresaComponent implements OnInit {

  actividades: Actividad[] = [];

  actividad = new Actividad;
  solicitudEmpresa = new SolicitudEmpresa;

  displayEU: boolean;
  loading: boolean = true;

  archivo: File;
  id: number;

  constructor(private actividadService: ActividadpService, private toastr: ToastrService, private activatedRoute: ActivatedRoute, private solicitudSerice: SoliEmpresaService) { }

  ngOnInit() {
    this.obtenerActividades();
    this.obtenerSolicitud();
  }

  guardarActividad() {

    this.actividadService.registerActividad(this.actividad).subscribe(
      result => {
        this.toastr.success("Actividad Creada", "Success");
        this.actividad.descripcion = '';
        this.obtenerActividades();
      });
  }

  obtenerSolicitud() {
    this.activatedRoute.params.subscribe(params => {
      let id = params['id'];
      this.id = id;
      console.log(id)
      if (id) {
        this.solicitudSerice.buscarxID(id).subscribe(
          (data: SolicitudEmpresa) => {
            this.solicitudEmpresa = data;
            this.actividad.solicitudEmpresa = this.solicitudEmpresa;
          }
        )
      }
    });
  }

  eliminarActividad(id: any) {
    this.actividadService.eliminarActividad(id).subscribe(
      result => {
        this.toastr.error("Actividad Eliminada", "");
        this.actividad.descripcion = '';
        this.obtenerActividades();
      })
  }

  obtenerActividades() {
    this.activatedRoute.params.subscribe(params => {
      let id = params['id']
      console.log(id)
      if (id) {
        this.actividadService.actividadBySolicitud(id).subscribe(
          result => {
            this.actividades = result;
          }
        );
      }
    });
    this.loading = false;
  }

  onFileChange(event: any) {
    this.archivo = event.target.files[0];
  }

  updatePDFSolicitud() {

    this.solicitudSerice.guardarPDF(this.archivo, this.id).subscribe(
      (response: any) => {
        Swal.fire('Registro', 'PDF actualizado correctamente', 'success');
        this.reloadPage();
      },
      (error) => {
        console.error('Error al actualizar el PDF', error);
        Swal.fire('Registro', 'Error al subir el PDF', 'error');
      }
    );
  }

  descargarPDF(value) {
    this.solicitudSerice.obtenerPDF(value).subscribe(response => {
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
    return 'SolicitudEstudiante.pdf';
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

  reloadPage() {
    window.location.reload();
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
          alignment: "right",
          margin: [0, 0, 0, 10],
        },
        {
          text: 'Solicitud emitida por entidad receptora',
          style: 'header',
          alignment: "left",
        },
        { text: ' ' },
        {
          text: fechaCompleta,
          style: 'subheader',
          alignment: 'right',
          margin: [0, 10, 0, 0]
        },
        {
          text: 'Magister',
          style: 'body',
          margin: [0, 5, 0, 0]
        },
        {
          text: 'Juan Gabriel Espinoza.',
          style: 'body'
        },
        {
          text: 'RESPONSABLE DE PRÁCTICAS PRE PROFESIONALES',
          style: 'body'
        },
        {
          text: 'INSTITUTO SUPERIOR UNIVERSITARIO TECNOLÓGICO DEL AZUAY',
          style: 'body'
        },
        {
          text: 'Su Despacho. -',
          style: 'body'
        },
        { text: ' ' },
        {
          text: 'De mi consideración:',
          style: 'body'
        },
        { text: ' ' },
        {
          text: 'Reciba un cordial saludo de quienes conformamos NOMBRE DE LA ENTIDAD RECEPTORA en atención del convenio que mantenemos con el Instituto Superior Tecnológico del Azuay, doy a conocer que se requiere de dos estudiantes para realizar actividades relacionadas con el desarrollo de software:'
          , style: 'body'
        },
        {
          text: 'Describir las actividades a realizar, ejemplo:',
          style: 'body'
        },
        ...this.actividades.map(actividad => {
          return { text: actividad.descripcion };
        }),
        {
          text: 'La fecha de inicio tentativa es el 14 de marzo de 2023.'
          , style: 'body'
        },
        {
          text: 'Solicito comedidamente se me informe si esta petición es viable, y en caso de serlo, se me haga conocer el listado de estudiantes que podrían ingresar a la empresa.'
          , style: 'body'
        },
        {
          text: ' ',
          style: 'body'
        },
        {
          text: 'Agradezco de antemano la atención que brinde a la presente.',
          style: 'body'
        },
        {
          text: ' ',
          style: 'body'
        },
        {
          text: 'Atentamente,'
          , style: 'body'
        },
        {
          text: ' '
          , style: 'body'
        },
        {
          text: '_______________________',
          style: 'body'
        },
        {
          text: 'Nombre de la persona que solicita'
          , style: 'body'
        },
        {
          text: 'Cargo en la empresa',
          style: 'body'
        },
        {
          text: 'Nro. Contacto',
          style: 'body'
        }
      ],
      styles: {
        header: {
          fontSize: 11,
          bold: true,
          alignment: 'center',
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
      },
    };

    pdfMake.createPdf(documentDefinition).download('solicitud-entidad-receptora.pdf');
  }

}
