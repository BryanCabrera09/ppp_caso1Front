import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GenerateObligacionesModule } from './generate-obligaciones.module';
import { ReportComponent } from './pages/report/report.component';

const routes: Routes = [
  {
    path: 'report',
    component: ReportComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GenerateObligacionesRoutingModule { }
