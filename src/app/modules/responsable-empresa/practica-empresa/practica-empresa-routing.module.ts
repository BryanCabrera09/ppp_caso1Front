import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListPracticasComponent } from './pages/list-practicas/list-practicas.component';

const routes: Routes = [
  {
    path: 'lista-practicas',
    component: ListPracticasComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PracticaEmpresaRoutingModule { }
