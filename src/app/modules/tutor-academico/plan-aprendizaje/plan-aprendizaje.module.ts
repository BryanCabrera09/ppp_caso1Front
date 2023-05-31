import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PlanAprendizajeRoutingModule } from './plan-aprendizaje-routing.module';
import { GenerarPlanComponent } from './generar-plan/generar-plan.component';
import { PracticasTutorComponent } from './practicas-tutor/practicas-tutor.component';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DropdownModule } from 'primeng/dropdown';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatExpansionModule } from '@angular/material/expansion';


@NgModule({
  declarations: [
    GenerarPlanComponent,
    PracticasTutorComponent
  ],
  imports: [
    CommonModule,
    PlanAprendizajeRoutingModule,
    FormsModule,
    DropdownModule,
    MatButtonModule,
    MatIconModule,
    MatExpansionModule,
    ReactiveFormsModule
  ]
})
export class PlanAprendizajeModule { }
