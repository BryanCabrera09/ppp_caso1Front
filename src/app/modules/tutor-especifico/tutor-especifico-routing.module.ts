import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import("./dashboard-tutespecifico/dashboard-tutespecifico.module").then(m => m.DashboardTutespecificoModule),
  },
  {
    path: 'calificacion',
    loadChildren: () => import("./calificacion/calificacion.module").then(m => m.CalificacionModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TutorEspecificoRoutingModule { }
