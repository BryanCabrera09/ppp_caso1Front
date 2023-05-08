import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GenConvocatoriaComponent } from './pages/gen-convocatoria/gen-convocatoria.component';

const routes: Routes = [
  {
    path: 'lista',
    component: GenConvocatoriaComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GenerateConvocatoriaRoutingModule { }
