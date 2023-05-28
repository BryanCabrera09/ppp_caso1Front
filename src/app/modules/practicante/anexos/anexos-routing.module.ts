import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListpracComponent } from './pages/listprac/listprac.component';



const routes: Routes = [
  {
    path: 'lista-practicas',
    component: ListpracComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AnexosRoutingModule { }
