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
        { text: 'Lista de Actividades', style: 'header' },
        { text: ' ', style: 'space' },
        ...this.actividades.map(actividad => {
          return [
            { text: 'Nombre:', style: 'subheader' },
            { text: this.actividad.descripcion },
            { text: 'Descripción:', style: 'subheader' },
            { text: actividad.descripcion },
            { text: ' ', style: 'space' },
          ];
        })
      ],
      styles: {
        header: {
          fontSize: 18,
          bold: true,
          alignment: 'center',
        },
        subheader: {
          fontSize: 14,
          bold: true,
        },
        space: {
          margin: [0, 10, 0, 10],
        },
      },
    };

    pdfMake.createPdf(documentDefinition).open();
  }

}
