import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ConvocatoriasComponent } from './convocatorias/convocatorias.component';

const routes: Routes = [
  {
    path: 'ultimas',
    component: ConvocatoriasComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NoticesRoutingModule { }
