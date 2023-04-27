import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TutorAcademicoRoutingModule } from './tutor-academico-routing.module';
import { WelcomeAcademicoComponent } from './welcome-academico/welcome-academico.component';


@NgModule({
  declarations: [
    WelcomeAcademicoComponent
  ],
  imports: [
    CommonModule,
    TutorAcademicoRoutingModule
  ]
})
export class TutorAcademicoModule { }
