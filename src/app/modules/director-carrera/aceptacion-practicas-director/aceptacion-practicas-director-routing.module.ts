import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AceptacionSolicitudDirectorComponent } from './pages/aceptacion-solicitud-director/aceptacion-solicitud-director.component';

const routes: Routes = [
  {
    path: 'lista-practicantes/:id',
    component: AceptacionSolicitudDirectorComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AceptacionPracticasDirectorRoutingModule { }
