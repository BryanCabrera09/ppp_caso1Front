import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ReporteSaludComponent } from './pages/reporte-salud/reporte-salud.component';
import { RespuestaPostulacionModule } from '../respuesta-postulacion/respuesta-postulacion.module';

const routes: Routes = [
  {
    path: 'report',
    component: ReporteSaludComponent,
  },
  {
    path: 'postulacion',
    component: RespuestaPostulacionModule,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SaludOcupacionalRoutingModule { }
