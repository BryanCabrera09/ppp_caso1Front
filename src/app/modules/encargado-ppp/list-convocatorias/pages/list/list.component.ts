import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ConvocatoriaP } from 'src/app/core/models/convocatoria-p';
import { ConvocatoriaService } from 'src/app/core/services/convocatoria.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

  convocatorias: ConvocatoriaP[];

  id: number;
  loading: boolean = true;

  empresa: string;

  constructor(private convocatoriaService: ConvocatoriaService, private router: Router) { }

  ngOnInit() {
    this.cargarConvocatorias();
  }

  cargarConvocatorias() {
    this.convocatoriaService.obtenerConvocatoria().subscribe(
      data => {
        this.convocatorias = data.map(
          result => {
            let convocatoria = new ConvocatoriaP;
            convocatoria.id = result.id;
            convocatoria.fechaInicio = result.fechaInicio;
            convocatoria.fechaFin = result.fechaFin;
            convocatoria.numero = result.numero;
            if (result.solicitudEmpresa !== null) {
              this.empresa = result.solicitudEmpresa!.convenio!.empresa!.nombre;
            }
            this.id = result.id;
            console.log(result);
            return convocatoria;
          }
        );
      }
    );
    this.loading = false;
  }

  listarPostulantes(id: any) {
    this.id = id;
    this.router.navigate(['encargado-practicas/encargado//lista-practicantes/' + this.id]);
  }
}
