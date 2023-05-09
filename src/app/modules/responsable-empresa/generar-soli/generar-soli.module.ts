import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GenerarSoliRoutingModule } from './generar-soli-routing.module';
import { SoliEstComponent } from './soli-est/soli-est.component';


@NgModule({
  declarations: [
    SoliEstComponent
  ],
  imports: [
    CommonModule,
    GenerarSoliRoutingModule
  ]
})
export class GenerarSoliModule { }
