import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DirectorCarreraRoutingModule } from './director-carrera-routing.module';
import { WelcomeDirectorComponent } from './welcome-director/welcome-director.component';


@NgModule({
  declarations: [
    WelcomeDirectorComponent
  ],
  imports: [
    CommonModule,
    DirectorCarreraRoutingModule
  ]
})
export class DirectorCarreraModule { }
