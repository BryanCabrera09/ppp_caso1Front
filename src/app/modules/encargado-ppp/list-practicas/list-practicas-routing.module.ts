import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListarPracticasComponent } from './pages/listar-practicas/listar-practicas.component';

const routes: Routes = [
  {
    path: 'lista-practicas/:id',
    component: ListarPracticasComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ListPracticasRoutingModule { }
