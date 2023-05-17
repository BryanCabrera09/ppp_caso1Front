import { Component, OnInit } from '@angular/core';
import { Carrera } from 'src/app/core/models/carrera';
import { Materia } from 'src/app/core/models/materia';
import { CarreraMateriaService } from 'src/app/core/services/carrera-materia.service';
import { MateriaService } from 'src/app/core/services/materia.service';

import { RegEmpresaServiceService } from 'src/app/core/services/reg-empresa-service.service';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit{
  opcionSeleccionada: string;
  opcionesGuardadas: string[] = [];
  Materias: Materia[] = []

  ngOnInit(): void {
    this.materiaService.Listarmateria().subscribe(
      carr=> this.Materias = carr
    );
  }
  
  constructor(private materiaService: MateriaService){}

  guardarOpcion(e:any) {
   this.opcionSeleccionada = e.target.value
    if (this.opcionSeleccionada) {
      this.opcionesGuardadas.push(this.opcionSeleccionada);
      this.opcionSeleccionada = ''; // Limpiar la selección después de guardarla
    }
  }

}
