import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'director',
    loadChildren: () => import("./aceptacion-practicas-director/aceptacion-practicas-director.module").then(m => m.AceptacionPracticasDirectorModule)
  },
  {
    path: 'director',
    loadChildren: () => import("./list-convocatoria/list-convocatoria.module").then(m => m.ListConvocatoriaModule)
  },
  {
    path: '',
    loadChildren: () => import("./dashboard-director/dashboard-director.module").then(m => m.DashboardDirectorModule)
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DirectorCarreraRoutingModule { }
