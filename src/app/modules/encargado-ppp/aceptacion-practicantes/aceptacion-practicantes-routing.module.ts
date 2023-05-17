import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AceptacionSolicitudesComponent } from './pages/aceptacion-solicitudes/aceptacion-solicitudes.component';

const routes: Routes = [
  {
    path: 'lista-practicantes/:id',
    component: AceptacionSolicitudesComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AceptacionPracticantesRoutingModule { }
