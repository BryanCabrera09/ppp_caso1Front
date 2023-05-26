import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ActividadesPropuestasRoutingModule } from './actividades-propuestas-routing.module';
import { ActividadComponent } from './pages/actividad/actividad.component';
import { ObjetivoComponent } from './pages/objetivo/objetivo.component';
import { Dropdown, DropdownModule } from 'primeng/dropdown';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    ActividadComponent,
    ObjetivoComponent
  ],
  imports: [
    CommonModule,
    ActividadesPropuestasRoutingModule,
    DropdownModule,
    FormsModule
  ]
})
export class ActividadesPropuestasModule { }
