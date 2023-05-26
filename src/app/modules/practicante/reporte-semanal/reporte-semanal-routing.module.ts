import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Anexo6GenerateComponent } from './pages/anexo6-generate/anexo6-generate.component';

const routes: Routes = [
  {
    path: 'semanal',
    component: Anexo6GenerateComponent ,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReporteSemanalRoutingModule { }
