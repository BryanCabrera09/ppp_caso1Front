import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TutorEspecificoRoutingModule } from './tutor-especifico-routing.module';
import { WelcomeEspecificoComponent } from './welcome-especifico/welcome-especifico.component';
import { RouterModule } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';
import { PracticasComponent } from './practicas/practicas.component';


@NgModule({
  declarations: [
    WelcomeEspecificoComponent,
    PracticasComponent
  ],
  imports: [
    CommonModule,
    TutorEspecificoRoutingModule,
    SharedModule,
    RouterModule
  ]
})
export class TutorEspecificoModule { }
