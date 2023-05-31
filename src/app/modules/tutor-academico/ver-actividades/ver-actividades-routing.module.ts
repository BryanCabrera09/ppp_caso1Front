import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EstudiantesComponent } from './pages/estudiantes/estudiantes.component';
import { ActividadComponent } from '../../encargado-ppp/actividades-propuestas/pages/actividad/actividad.component';

const routes: Routes = [
  {
    path: 'estudiantes',
    component: EstudiantesComponent
  },
  {
    path: 'actividades/:id',
    component: ActividadComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VerActividadesRoutingModule { }
