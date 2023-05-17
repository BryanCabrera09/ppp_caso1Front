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
            this.id = result.id;
            return convocatoria;
          }
        );
      }
    );
    this.loading = false;
  }

  listarPostulantes() {
    localStorage.setItem('convocatoriaId', this.id.toString());
    this.router.navigate(['director-carrera/director/lista-practicantes']);
  }
}
