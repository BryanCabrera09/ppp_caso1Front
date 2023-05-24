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
        this.convocatorias = data;
      }
    );
    this.loading = false;
  }

  listarPostulantes(id: any) {
    this.id = id;
    this.router.navigate(['encargado-practicas/encargado/lista-practicantes/' + this.id]);
  }
}
