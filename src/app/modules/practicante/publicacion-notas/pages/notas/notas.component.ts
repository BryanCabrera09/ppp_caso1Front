import { Component, OnInit } from '@angular/core';
import { Calificacion } from 'src/app/core/models/calificacion';
import { Estudiante } from 'src/app/core/models/estudiante';
import { Practica } from 'src/app/core/models/practica';
import { Usuario } from 'src/app/core/models/usuario';
import { CalificacionService } from 'src/app/core/services/calificacion.service';
import { EstudianteService } from 'src/app/core/services/estudiante.service';
import { PracticasService } from 'src/app/core/services/practicas.service';

@Component({
  selector: 'app-notas',
  templateUrl: './notas.component.html',
  styleUrls: ['./notas.component.css']
})
export class NotasComponent implements OnInit {

  loading: boolean = true
  estudianteId: number;
  estudiante = new Estudiante;
  practica = new Practica;
  usuario = new Usuario;
  calificacion = new Calificacion;

  calificaciones: Calificacion[];

  idUs: number;
  displayEU: boolean;
  selectedTutor: string;

  tutores: string[] = [
    'Calificación Tutor Academico',
    'Calificación Tutor Específico'
  ]

  acronimo: string;

  constructor(private estudianteService: EstudianteService, private practicaService: PracticasService, private calificacionService: CalificacionService) { }

  ngOnInit() {
    this.buscarEstudiante();
  }

  selectedCell: { [key: string]: number } = {};
  selectedValues: Map<string, number> = new Map<string, number>();

  toggleCheck(rowKey: string, colIndex: number) {
    if (this.selectedCell[rowKey] === colIndex) {
      delete this.selectedCell[rowKey];
      this.selectedValues.delete(rowKey);
    } else {
      this.selectedCell[rowKey] = colIndex;
      const value = this.getCellValue(rowKey, colIndex);
      console.log('Valor seleccionado:', value);
      this.selectedValues.set(rowKey, value);
      console.log(this.selectedValues)
    }
  }

  getCellValue(rowKey: string, colIndex: number): number {
    const values: { [key: string]: number[] } = {
      a: [20, 15, 10, 5, 1],
      b: [20, 15, 10, 5, 1],
      c: [20, 15, 10, 5, 1],
      d: [20, 15, 10, 5, 1],
      e: [20, 15, 10, 5, 1]
    };
    return values[rowKey][colIndex];
  }

  buscarEstudiante() {
    // Obtener el estudiante por ID de usuario
    this.usuario = JSON.parse(sessionStorage.getItem('userdetails')!);
    this.idUs = this.usuario.id;
    console.log(this.idUs)

    // Reemplazar con el ID de usuario correspondiente
    this.estudianteService.buscarxUsuario(this.idUs).subscribe(
      (data: Estudiante) => {
        this.estudiante = data;
        this.estudiante.id = data.id;
        this.buscarPracticas();
      },
      (error) => {
        console.error(error);
      }
    );
  }

  buscarPracticas() {
    // Obtener las prácticas del estudiante por su ID
    this.practicaService.buscarxEstudiante(this.estudiante.id).subscribe(
      (data: Practica) => {
        this.practica = data;
        this.practica.id = data.id;
        this.cargarCalificacion();
      },
      (error) => {
        console.error(error);
      }
    );
    this.loading = false;
  }

  cargarCalificacion() {
    this.calificacionService.buscarxPractica(this.practica.id).subscribe(
      (data: Calificacion) => {
        this.calificacion = data;
        this.calificacion.id = data.id;
        console.log(data)
      },
      (error) => {
        console.error(error);
      }
    );
  }

  fileSelected(event: any) {
    const file: File = event.target.files[0];
    const reader = new FileReader();

    reader.onloadend = () => {
      const base64String = reader.result as string;
      // Aquí puedes almacenar o procesar la cadena Base64 como necesites
      console.log(base64String);
    };

    reader.readAsDataURL(file);
  }

}
