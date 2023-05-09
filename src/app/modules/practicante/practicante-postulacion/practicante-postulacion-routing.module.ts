import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PostulacionComponent } from './pages/postulacion/postulacion.component';
import { SeleccionComponent } from './pages/seleccion/seleccion.component';

const routes: Routes = [
  {
    path: 'postulacion-estudiante',
    component: PostulacionComponent,
  },
  {
    path: 'seleccion-empresa',
    component: SeleccionComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PracticantePostulacionRoutingModule { }
