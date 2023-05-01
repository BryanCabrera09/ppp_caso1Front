import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EncargadoPppRoutingModule } from './encargado-ppp-routing.module';
import { WelcomeEncargadoComponent } from './welcome-encargado/welcome-encargado.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { RouterModule } from '@angular/router';


@NgModule({
  declarations: [
    WelcomeEncargadoComponent,
  ],
  imports: [
    CommonModule,
    EncargadoPppRoutingModule,
    SharedModule,
    RouterModule
  ],
  exports: [
    WelcomeEncargadoComponent
  ]
})
export class EncargadoPppModule { }
