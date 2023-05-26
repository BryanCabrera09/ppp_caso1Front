import { Component, OnInit } from '@angular/core';
import { Actividad } from 'src/app/core/models/actividad';
import { Route, ActivatedRoute } from '@angular/router';
import { ActividadpService } from 'src/app/core/services/actividadp.service';
import { Materia } from 'src/app/core/models/materia';
import { MateriaService } from 'src/app/core/services/materia.service';
import { ObjetivoMateriaService } from 'src/app/core/services/objetivos-materia.service';
import { Objetivomateria } from 'src/app/core/models/objetivo-materia';


@Component({
  selector: 'app-objetivo',
  templateUrl: './objetivo.component.html',
  styleUrls: ['./objetivo.component.css']
})
export class ObjetivoComponent implements OnInit {

  selectedMateria: string;
  descripcionObjetivo: string;
  actividades: Actividad[];
  actividad: Actividad
  materia: Materia[];
  materiab: Materia;
  objetivom: Objetivomateria[];
  objetivop: Objetivomateria;


  constructor(private route: ActivatedRoute, private actividadservice: ActividadpService, private materiaservice: MateriaService,
    private objetivo: ObjetivoMateriaService) { }



  ngOnInit(): void {
    this.route.queryParams.subscribe(
      params => {
        this.actividad = JSON.parse(params['actividad']);
        console.log("actividad" + this.actividad);
        this.buscarmateriaxcarrera(this.actividad.solicitudEmpresa.convenio.carrera.id);
      }
    );
  }


  guardarmateria() {
    this.actividad.materia = this.objetivop.materia;
    console.log(this.objetivop.materia)
    this.actividadservice.editar(this.actividad.id, this.actividad).subscribe(
      (res) => {
        console.log(res)
      }
    )
  }

  buscarmateriaxcarrera(id: number) {
    this.materiaservice.buscarmateriaxcarrera(id).subscribe(
      dato => {
        this.materia = dato;
        console.log(this.materia);
      }
    )
  }


  materiaid(value) {
    this.objetivo.listarxmateria(value).subscribe(
      (data) => {
        this.objetivom = data;
        this.objetivop = this.objetivom[0]
        this.descripcionObjetivo = this.objetivop.descripcion
        console.log(this.objetivop)
        console.log(data)
      })
  }



}