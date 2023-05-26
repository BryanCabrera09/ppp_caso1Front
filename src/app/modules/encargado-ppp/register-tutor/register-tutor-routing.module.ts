import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegTutorComponent } from './pages/reg-tutor/reg-tutor.component';

const routes: Routes = [
  {
    path: 'register-tutor/:id',
    component: RegTutorComponent,
  },
  {
    path: 'register-tutor-emp/:id',
    component: RegTutorComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RegisterTutorRoutingModule { }
