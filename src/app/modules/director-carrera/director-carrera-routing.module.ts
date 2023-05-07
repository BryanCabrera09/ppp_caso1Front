import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'director',
    loadChildren: () => import("./aceptacion-practicas-director/aceptacion-practicas-director.module").then(m => m.AceptacionPracticasDirectorModule)
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DirectorCarreraRoutingModule { }
