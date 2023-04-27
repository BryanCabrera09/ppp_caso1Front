import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TutorEspecificoRoutingModule } from './tutor-especifico-routing.module';
import { WelcomeEspecificoComponent } from './welcome-especifico/welcome-especifico.component';


@NgModule({
  declarations: [
    WelcomeEspecificoComponent
  ],
  imports: [
    CommonModule,
    TutorEspecificoRoutingModule
  ]
})
export class TutorEspecificoModule { }
