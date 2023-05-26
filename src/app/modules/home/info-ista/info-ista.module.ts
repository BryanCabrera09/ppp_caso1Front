import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InfoIstaRoutingModule } from './info-ista-routing.module';
import { MisionVisionPrincipiosComponent } from './pages/mision-vision-principios/mision-vision-principios.component';


@NgModule({
  declarations: [
    MisionVisionPrincipiosComponent
  ],
  imports: [
    CommonModule,
    InfoIstaRoutingModule
  ]
})
export class InfoIstaModule { }
