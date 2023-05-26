import { Component, OnInit } from '@angular/core';
import { Carrera } from 'src/app/core/models/carrera';
import { Materia } from 'src/app/core/models/materia';
import { Objetivomateria } from 'src/app/core/models/objetivo-materia';
import { CarreraMateriaService } from 'src/app/core/services/carrera-materia.service';
import { ObjetivoMateriaService } from 'src/app/core/services/objetivos-materia.service';
import { MateriaService } from 'src/app/core/services/materia.service';
import Swal from 'sweetalert2';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-reg-objetivos',
  templateUrl: './reg-objetivos.component.html',
  styleUrls: ['./reg-objetivos.component.css'],
})
export class RegObjetivosComponent implements OnInit {

  objetivo: Objetivomateria = new Objetivomateria();
  materia: Materia = new Materia();
  carrera: Carrera = new Carrera();

  objetivosMateria: Objetivomateria[];
  carreras: Carrera[] = [];
  materias: Materia[];

  loading: boolean = true;
  displayPopup: boolean = false;
  displayPopups: boolean = false;

  selectedCarrera: string;
  selectedMateria: string;

  constructor(private objetivomateriaservice: ObjetivoMateriaService, private carreraService: CarreraMateriaService, private materiaService: MateriaService,
    private toastr: ToastrService) { }

  ngOnInit() {

    this.cleanCampos();
    this.obtenerObjetivs();


    this.carreraService.ListarCarrera().subscribe(
      data => {
        this.carreras = data;
      }
    )

    this.materiaService.Listarmateria().subscribe(
      data => {
        this.materias = data;
      }
    )
  }

  obtenerObjetivs() {
    this.objetivomateriaservice.Listarob().subscribe(
      data => {
        this.objetivosMateria = data;
      }
    )
    this.loading = false;
  }

  cleanCampos() {
    this.selectedCarrera = null;
    this.selectedMateria = null;
    this.objetivo = new Objetivomateria;
    this.materia = new Materia;
    this.carrera = new Carrera;
  }

  openPopup() {
    this.cleanCampos();
    this.displayPopup = true;
  }
  openPopups() {
    this.cleanCampos();
    this.displayPopups = true;
  }

  eliminarObjetivo(id: any) {
    this.objetivomateriaservice.eliminarObjetivo(id).subscribe(
      result => {
        this.toastr.error("Objetivo Materia Eliminada", "");
        this.obtenerObjetivs();
      })
  }

  carreraCon(value) {
    this.carreraService.searchCarrera(value).subscribe(
      (data: Carrera) => {
        this.carrera = data
      }
    )
  }

  materiaCon(value) {
    this.materiaService.buscarMateria(value).subscribe(
      (data: Materia) => {
        this.materia = data
      }
    )
  }

  GuardarAsignatura() {

    this.materia.carrera = this.carrera
    this.materiaService.guardarCarrera(this.materia).subscribe(
      (data) => {
        console.log(data);
        this.ngOnInit();
        Swal.fire('Asignatura Guardado', 'Asignatura Guardado con exito en el sistema', 'success');

      }, (error) => {
        console.log(error);
        Swal.fire('Error', 'Nose Guardo la Asignatura', 'error');
      }
    );
    localStorage.removeItem('asignatura');

  }

  GuardarObjeto() {

    this.objetivo.materia = this.materia
    this.objetivomateriaservice.Guardarobj(this.objetivo).subscribe(
      (data) => {
        console.log(data);
        this.ngOnInit();
        Swal.fire('Objetivo Guardado', 'Objetivo Guardado con Exito', 'success');
      }, (error) => {
        console.log(error);
        Swal.fire('Error', 'Objetivo no se Pudo Guardar', 'error');
      }
    );
    localStorage.removeItem('objetivo');
  }

}
