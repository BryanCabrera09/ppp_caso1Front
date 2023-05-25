import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'postulacion',
    loadChildren: () => import("./practicante-postulacion/practicante-postulacion.module").then(m => m.PracticantePostulacionModule)
  }, 
  {
    path: '',
    loadChildren: () => import("./dashboard-practicante/dashboard-practicante.module").then(m => m.DashboardPracticanteModule)
  },
  {
    path: 'generate',
    loadChildren: () => import("./generate-obligaciones/generate-obligaciones.module").then(m => m.GenerateObligacionesModule)
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PracticanteRoutingModule { }
