import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'postulacion',
    loadChildren: () => import("./practicante-postulacion/practicante-postulacion.module").then(m => m.PracticantePostulacionModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PracticanteRoutingModule { }
