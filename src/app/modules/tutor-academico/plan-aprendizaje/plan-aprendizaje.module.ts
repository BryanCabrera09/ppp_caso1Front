import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PlanAprendizajeRoutingModule } from './plan-aprendizaje-routing.module';
import { GenerarPlanComponent } from './generar-plan/generar-plan.component';
import { PracticasTutorComponent } from './practicas-tutor/practicas-tutor.component';


@NgModule({
  declarations: [
    GenerarPlanComponent,
    PracticasTutorComponent
  ],
  imports: [
    CommonModule,
    PlanAprendizajeRoutingModule
  ]
})
export class PlanAprendizajeModule { }
