import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PresentarComponent } from './pages/presentar/presentar.component';

const routes: Routes = [
  {
    path: 'anexos',
    component: PresentarComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AnexosPresentarRoutingModule { }
