import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import * as pdfMake from 'pdfmake/build/pdfmake';
import * as pdfFonts from 'pdfmake/build/vfs_fonts';
import { Resultado } from 'src/app/core/models/resultado';
import { ActividadpService } from 'src/app/core/services/actividadp.service';
import { PracticasService } from 'src/app/core/services/practicas.service';
import { ResultadoCarreraService } from 'src/app/core/services/resultado-carrera.service';
import { ResultadoService } from 'src/app/core/services/resultado.service';
import Swal from 'sweetalert2';

(pdfMake as any).vfs = pdfFonts.pdfMake.vfs;

@Component({
  selector: 'app-generar-plan',
  templateUrl: './generar-plan.component.html',
  styleUrls: ['./generar-plan.component.css']
})
export class GenerarPlanComponent implements OnInit {

  numeroSemanas: number;
  semanas: number[] = [];
  mostrarTabla: boolean = false;

  todosSeleccionados: boolean = false;
  dropdownSeleccionado: boolean[] = [];

  cargarSemanas() {
    this.semanas = []; // Restablecer el arreglo semanas
    if (this.numeroSemanas === 6 || this.numeroSemanas === 12) {
      for (let i = 1; i <= this.numeroSemanas; i++) {
        this.semanas.push(i);
      }
      this.mostrarTabla = true; // Mostrar la tabla
    }
  }

  practica: any;
  resultadosCarrera: any[];
  resultados: Resultado[] = [];
  actividades: any[];


  constructor(private route: ActivatedRoute, private pracServ: PracticasService,
    private resCarServ: ResultadoCarreraService, private atcServ: ActividadpService,
    private resServ: ResultadoService) { }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.practica = JSON.parse(params['practica']);
      console.log("practica: " + this.practica);
      this.listarResultados(this.practica.estudiante.carrera.id);
      this.listarActividades(this.practica.convocatoria.solicitudEmpresa.id)
    });
  }

  listarResultados(id: number) {
    this.resCarServ.listarPorCarreraId(id).subscribe(
      (res) => {
        this.resultadosCarrera = res;
        console.log("resultadosCarrera: " + this.resultadosCarrera)
      }
    )
  }

  listarActividades(id: number) {
    this.atcServ.obtenerActividadid(id).subscribe(
      (res) => {
        this.actividades = res;
        this.dropdownSeleccionado.fill(false, 0, this.actividades.length);
        console.log("Actividades: " + this.actividades)
      }
    )
  }

  crearResultado(value, id) {
    const index = this.actividades.findIndex(atv => atv.id === id);
    this.dropdownSeleccionado[index] = true;
    let resultado = new Resultado();
    let resCarrera: any = {};
    resCarrera.id = value;
    let activity: any = {};
    activity.id = id;
    resultado.actividad = activity;
    resultado.resultadoMateria = resCarrera;
    resultado.practica = this.practica;
    this.resultados.push(resultado);
    console.log(this.resultados);
    if (this.dropdownSeleccionado.every(selected => selected)) {
      this.todosSeleccionados = true;
    } 
  }

  editarPractica() {
    this.pracServ.editarPractica(this.practica.id, this.practica).subscribe(
      (res) => {
        console.log(res);
        this.gueardarResultados();
      }
    )
  }

  gueardarResultados() {
      this.resServ.crearMuchos(this.resultados).subscribe(
        (res) => {
          console.log(res)
        }
      )
  }  

}
