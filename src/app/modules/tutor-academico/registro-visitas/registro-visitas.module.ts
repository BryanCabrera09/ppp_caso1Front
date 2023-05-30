import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RegistroVisitasRoutingModule } from './registro-visitas-routing.module';
import { RegistroComponent } from './pages/registro/registro.component';
import { PlanVisitasComponent } from './pages/plan-visitas/plan-visitas.component';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    RegistroComponent,
    PlanVisitasComponent,
  ],
  imports: [
    CommonModule,
    RegistroVisitasRoutingModule,
    FormsModule
  ]
})
export class RegistroVisitasModule { }
