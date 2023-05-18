import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SoliEstComponent } from './soli-est/soli-est.component';
import { ListaEmpresaComponent } from './lista-empresa/lista-empresa.component';

const routes: Routes = [
  {
    path: 'lista',
    component: SoliEstComponent,

  },
  {
    path: 'listemp',
    component: ListaEmpresaComponent,
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GenerarSoliRoutingModule { }
