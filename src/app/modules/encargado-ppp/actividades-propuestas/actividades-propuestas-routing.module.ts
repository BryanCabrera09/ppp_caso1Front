import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ActividadComponent } from './pages/actividad/actividad.component';

const routes: Routes = [
  {
    path: 'actividad-propuesta',
    component: ActividadComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ActividadesPropuestasRoutingModule { }
