import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RespuestaComponent } from './pages/respuesta/respuesta.component';

const routes: Routes = [
  {
    path: 'respuesta',
    component: RespuestaComponent ,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RespuestaPostulacionRoutingModule { }
