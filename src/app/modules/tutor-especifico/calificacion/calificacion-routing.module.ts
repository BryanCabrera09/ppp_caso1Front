import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PracticasTutorComponent } from './practicas-tutor/practicas-tutor.component';
import { GenerarNotaComponent } from './generar-nota/generar-nota.component';

const routes: Routes = [
  { path: 'practica-tutor', component: PracticasTutorComponent},
  { path: 'generar-nota', component: GenerarNotaComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CalificacionRoutingModule { }
