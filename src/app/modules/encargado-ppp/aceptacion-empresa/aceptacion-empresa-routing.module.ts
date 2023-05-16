import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AceptacionSolicitudComponent } from './pages/aceptacion-solicitud/aceptacion-solicitud.component';

const routes: Routes = [
  {
    path: 'solicitud-empresa',
    component: AceptacionSolicitudComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AceptacionEmpresaRoutingModule { }
