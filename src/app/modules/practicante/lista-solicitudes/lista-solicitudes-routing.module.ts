import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SolicitudesPostulacionComponent } from './pages/solicitudes-postulacion/solicitudes-postulacion.component';

const routes: Routes = [
  {
    path: 'postulacion',
    component: SolicitudesPostulacionComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ListaSolicitudesRoutingModule { }
