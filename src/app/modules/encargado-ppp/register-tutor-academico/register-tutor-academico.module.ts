import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RegisterTutorAcademicoRoutingModule } from './register-tutor-academico-routing.module';
import { TutorEspecificoComponent } from './pages/tutor-especifico/tutor-especifico.component';
import { TutorAcademicoComponent } from './pages/tutor-academico/tutor-academico.component';


@NgModule({
  declarations: [
    TutorEspecificoComponent,
    TutorAcademicoComponent
  ],
  imports: [
    CommonModule,
    RegisterTutorAcademicoRoutingModule
  ]
})
export class RegisterTutorAcademicoModule { }
