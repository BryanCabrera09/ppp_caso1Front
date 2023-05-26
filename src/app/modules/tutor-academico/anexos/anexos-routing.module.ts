import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AnxochComponent } from './anxoch/anxoch.component';

const routes: Routes = [
  {
    path: 'anexocho',
    component: AnxochComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AnexosRoutingModule { }
