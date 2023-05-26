import { Component, OnInit } from '@angular/core';
import { user } from '@angular/fire/auth';
import { ActivatedRoute, Router } from '@angular/router';
import { Calificacion } from 'src/app/core/models/calificacion';
import { Usuario } from 'src/app/core/models/usuario';
import { CalificacionService } from 'src/app/core/services/calificacion.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-generar-nota',
  templateUrl: './generar-nota.component.html',
  styleUrls: ['./generar-nota.component.css']
})
export class GenerarNotaComponent implements OnInit {

  user: Usuario;
  practica: any;
  calificacion: Calificacion = new Calificacion();
  suma: number;

  constructor(private route: ActivatedRoute, private calificacionService: CalificacionService,
    private router: Router) { }

  ngOnInit() {
    this.user = JSON.parse(sessionStorage.getItem('userdetails') || "");
    this.route.queryParams.subscribe(params => {
      this.practica = JSON.parse(params['practica']);
      console.log(this.practica);
    });
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

  calcularSuma(): number {
    this.suma = 0;
    this.selectedValues.forEach(value => {
      this.suma += value;
    });
    return this.suma;
  }

  guardar() {
    if (this.selectedValues.has("a") && this.selectedValues.has("b")
      && this.selectedValues.has("c") && this.selectedValues.has("d")
      && this.selectedValues.has("e") && this.suma > 0) {
      this.calificacion.a = this.selectedValues.get("a");
      this.calificacion.b = this.selectedValues.get('b');
      this.calificacion.c = this.selectedValues.get('c');
      this.calificacion.d = this.selectedValues.get('d');
      this.calificacion.e = this.selectedValues.get('e');
      this.calificacion.total = this.suma;
      this.calificacion.tutor = 2;
      this.calificacion.practica = this.practica;
      console.log(this.calificacion);
      this.calificacionService.saveGrade(this.calificacion).subscribe(
        (res) => {
          Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'La calificacón ha sido guardada',
            showConfirmButton: false,
            timer: 1500
          })
          this.router.navigate(['../tutor-especifico/calificacion/practica-tutor']);
        },
        (error) => {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Ya se ha generado una calificación por: ' + this.user.apellido + ', ' + this.user.nombre
          })
        }
        
      )
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Se debe seleccionar un valor por parámetro!',
      })
    }
  }



}
