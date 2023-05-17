import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TutorAcademicoComponent } from './pages/tutor-academico/tutor-academico.component';

const routes: Routes = [
  {
    path: 'register-tutor/:id',
    component: TutorAcademicoComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RegisterTutorAcademicoRoutingModule { }
