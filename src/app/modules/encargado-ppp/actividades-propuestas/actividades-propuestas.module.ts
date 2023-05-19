import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ActividadesPropuestasRoutingModule } from './actividades-propuestas-routing.module';
import { ActividadComponent } from './pages/actividad/actividad.component';
import { ObjetivoComponent } from './pages/objetivo/objetivo.component';


@NgModule({
  declarations: [
    ActividadComponent,
    ObjetivoComponent
  ],
  imports: [
    CommonModule,
    ActividadesPropuestasRoutingModule
  ]
})
export class ActividadesPropuestasModule { }
