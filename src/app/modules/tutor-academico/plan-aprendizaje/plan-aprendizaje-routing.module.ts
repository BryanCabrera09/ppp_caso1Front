import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PracticasTutorComponent } from './practicas-tutor/practicas-tutor.component';
import { GenerarPlanComponent } from './generar-plan/generar-plan.component';

const routes: Routes = [
  { path: 'practica-tutor', component: PracticasTutorComponent},
  { path: 'generar-plan', component: GenerarPlanComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PlanAprendizajeRoutingModule { }
