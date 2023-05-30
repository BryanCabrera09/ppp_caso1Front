import { Component, OnInit } from '@angular/core';
import { ConvocatoriaP } from 'src/app/core/models/convocatoria-p';
import { SoliEstudiante } from 'src/app/core/models/soli-estudiante';
import { Usuario } from 'src/app/core/models/usuario';
import { ConvocatoriaService } from 'src/app/core/services/convocatoria.service';
import { SoliEstudianteService } from 'src/app/core/services/soli-estudiante.service';

@Component({
  selector: 'app-solicitudes-postulacion',
  templateUrl: './solicitudes-postulacion.component.html',
  styleUrls: ['./solicitudes-postulacion.component.css']
})
export class SolicitudesPostulacionComponent implements OnInit {

  solicitudes: SoliEstudiante[];
  statuses: any[];

  usuario = new Usuario;

  idUs: number;
  estado: number;
  estadoString: string;

  loading: boolean = true;

  constructor(private solicitudService: SoliEstudianteService) { }

  private obtenerConvocatoria() {

    this.usuario = JSON.parse(sessionStorage.getItem('userdetails')!);
    this.idUs = this.usuario.id;
    console.log(this.idUs)

    this.solicitudService.getPostulacionesEnviadas(this.idUs).subscribe(
      data => {
        this.solicitudes = data;
        console.log(data);

        data.forEach(solicitud => {
          this.estado = solicitud.estado;
        });
      }
    );
    this.loading = false;
  }

  ngOnInit() {
    this.obtenerConvocatoria();
  }

  getSeverity(status) {

    if (status === 0) {
      this.estadoString = 'Enviado';
    } else if (status === 2) {
      this.estadoString = 'Aprobado'
    } else if (status === 3) {
      this.estadoString = 'Recazado'
    }

    switch (status) {
      case 3:
        return 'danger';

      case 2:
        return 'success';

      case 0:
        return 'waiting';

      default:
        return null; // Manejar cualquier otro caso inesperado
    }
  }
}
