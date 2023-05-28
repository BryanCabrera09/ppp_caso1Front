import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PlanAprendizajeRoutingModule } from './plan-aprendizaje-routing.module';
import { GenerarPlanComponent } from './generar-plan/generar-plan.component';
import { PracticasTutorComponent } from './practicas-tutor/practicas-tutor.component';
import { FormsModule } from '@angular/forms';
import { DropdownModule } from 'primeng/dropdown';


@NgModule({
  declarations: [
    GenerarPlanComponent,
    PracticasTutorComponent
  ],
  imports: [
    CommonModule,
    PlanAprendizajeRoutingModule,
    FormsModule,
    DropdownModule
  ]
})
export class PlanAprendizajeModule { }
