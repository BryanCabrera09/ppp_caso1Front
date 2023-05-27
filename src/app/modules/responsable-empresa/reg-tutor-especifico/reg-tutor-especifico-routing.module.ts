import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterTutorComponent } from './pages/register-tutor/register-tutor.component';

const routes: Routes = [
  {
    path: 'reg-tutor/:id',
    component: RegisterTutorComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RegTutorEspecificoRoutingModule { }
