import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CalificacionRoutingModule } from './calificacion-routing.module';
import { GenerarNotaComponent } from './generar-nota/generar-nota.component';
import { PracticasTutorComponent } from './practicas-tutor/practicas-tutor.component';
import { MatTableModule } from '@angular/material/table';
import { DialogModule } from 'primeng/dialog';


@NgModule({
  declarations: [
    GenerarNotaComponent,
    PracticasTutorComponent
  ],
  imports: [
    CommonModule,
    CalificacionRoutingModule,
    MatTableModule,
    DialogModule
  ]
})
export class CalificacionModule { }
