import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import("./dashboard-tutacademico/dashboard-tutacademico.module").then(m => m.DashboardTutacademicoModule)
  },
  {
    path: 'plan-aprendizaje',
    loadChildren: () => import("./plan-aprendizaje/plan-aprendizaje.module").then(m => m.PlanAprendizajeModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TutorAcademicoRoutingModule { }
