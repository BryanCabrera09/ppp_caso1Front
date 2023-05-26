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
  loading: boolean = true;

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
      let id = params['id']
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

  generarPDF() {
    const documentDefinition = {
      content: [
        { text: 'Solicitud emitida por entidad receptora', style: 'header' },
        { text: ' ' },
        { text: 'Cuenca, …… de …………………. del 2023' },
        { text: 'Magister' },
        { text: 'Juan Gabriel Espinoza.' },
        { text: 'RESPONSABLE DE PRÁCTICAS PRE PROFESIONALES' },
        { text: 'INSTITUTO SUPERIOR UNIVERSITARIO TECNOLÓGICO DEL AZUAY' },
        { text: 'Su Despacho. -' },
        { text: ' ' },
        { text: 'De mi consideración:' },
        { text: ' ' },
        { text: 'Reciba un cordial saludo de quienes conformamos NOMBRE DE LA ENTIDAD RECEPTORA en atención del convenio que mantenemos con el Instituto Superior Tecnológico del Azuay, doy a conocer que se requiere de dos estudiantes para realizar actividades relacionadas con el desarrollo de software:' },
        { text: 'Describir las actividades a realizar, ejemplo:' },
        ...this.actividades.map(actividad => {
          return { text: actividad.descripcion };
        }),
        { text: 'La fecha de inicio tentativa es el 14 de marzo de 2023.' },
        { text: 'Solicito comedidamente se me informe si esta petición es viable, y en caso de serlo, se me haga conocer el listado de estudiantes que podrían ingresar a la empresa.' },
        { text: ' ' },
        { text: 'Agradezco de antemano la atención que brinde a la presente.' },
        { text: ' ' },
        { text: 'Atentamente,' },
        { text: ' ' },
        { text: '_______________________' },
        { text: 'Nombre de la persona que solicita' },
        { text: 'Cargo en la empresa' },
        { text: 'Nro. Contacto' }
      ],
      styles: {
        header: {
          fontSize: 18,
          bold: true,
          alignment: 'center',
        }
      },
    };

    pdfMake.createPdf(documentDefinition).open();
  }

}
