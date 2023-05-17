import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GenerarSoliRoutingModule } from './generar-soli-routing.module';
import { SoliEstComponent } from './soli-est/soli-est.component';
import { FormsModule } from '@angular/forms';
import { NgProgressModule } from 'ngx-progressbar';


@NgModule({
  declarations: [
    SoliEstComponent
  ],
  imports: [
    CommonModule,
    GenerarSoliRoutingModule,
    FormsModule,
    NgProgressModule
  ]
})
export class GenerarSoliModule { }
