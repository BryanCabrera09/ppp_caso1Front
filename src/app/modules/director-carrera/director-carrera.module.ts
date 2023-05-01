import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DirectorCarreraRoutingModule } from './director-carrera-routing.module';
import { WelcomeDirectorComponent } from './welcome-director/welcome-director.component';
import { RouterModule } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [
    WelcomeDirectorComponent
  ],
  imports: [
    CommonModule,
    DirectorCarreraRoutingModule,
    SharedModule,
    RouterModule
  ],
  exports: [
    WelcomeDirectorComponent
  ]
})
export class DirectorCarreraModule { }
