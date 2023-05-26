import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ReporteSaludComponent } from './pages/reporte-salud/reporte-salud.component';

const routes: Routes = [
  {
    path: 'report',
    component: ReporteSaludComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SaludOcupacionalRoutingModule { }
