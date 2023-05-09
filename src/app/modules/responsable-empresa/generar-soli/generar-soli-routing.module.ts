import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SoliEstComponent } from './soli-est/soli-est.component';

const routes: Routes = [
  {
    path: 'lista',
    component: SoliEstComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GenerarSoliRoutingModule { }
