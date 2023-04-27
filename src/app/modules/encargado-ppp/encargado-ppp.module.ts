import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EncargadoPppRoutingModule } from './encargado-ppp-routing.module';
import { WelcomeEncargadoComponent } from './welcome-encargado/welcome-encargado.component';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [
    WelcomeEncargadoComponent,
  ],
  imports: [
    CommonModule,
    EncargadoPppRoutingModule,
  ]
})
export class EncargadoPppModule { }
