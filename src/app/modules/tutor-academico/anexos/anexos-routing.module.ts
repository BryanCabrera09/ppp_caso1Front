import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AnxochComponent } from './anxoch/anxoch.component';
import { LispractComponent } from './lispract/lispract.component';

const routes: Routes = [
  {
    path: 'anexocho',
    component: AnxochComponent,
  },
  {
    path: 'listapract',
    component: LispractComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AnexosRoutingModule { }
