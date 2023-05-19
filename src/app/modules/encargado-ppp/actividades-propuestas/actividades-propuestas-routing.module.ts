import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ActividadComponent } from './pages/actividad/actividad.component';
import { ObjetivoComponent } from './pages/objetivo/objetivo.component';

const routes: Routes = [
  {
    path: 'actividad-propuesta',
    component: ActividadComponent,
  },
  {
    path: 'objetivo',
    component: ObjetivoComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ActividadesPropuestasRoutingModule { }
