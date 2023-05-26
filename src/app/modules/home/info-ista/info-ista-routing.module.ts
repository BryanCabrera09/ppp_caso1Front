import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MisionVisionPrincipiosComponent } from './pages/mision-vision-principios/mision-vision-principios.component';

const routes: Routes = [
  {
    path: 'mision-vision-principios',
    component: MisionVisionPrincipiosComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InfoIstaRoutingModule { }
