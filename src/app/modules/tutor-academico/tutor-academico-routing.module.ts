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
  },
  {

    path: 'registro-visitas',
    loadChildren: () => import("./registro-visitas/registro-visitas.module").then(m => m.RegistroVisitasModule)
  },
  {
    path: 'calificacion',
    loadChildren: () => import("./calificacion/calificacion.module").then(m => m.CalificacionModule)
  },
  {
path: 'anexos',
  loadChildren: () => import("./anexos/anexos.module").then(m => m.AnexosModule)
},

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TutorAcademicoRoutingModule { }
