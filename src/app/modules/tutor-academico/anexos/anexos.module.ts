import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AnexosRoutingModule } from './anexos-routing.module';
import { AnxochComponent } from './anxoch/anxoch.component';
import { LispractComponent } from './lispract/lispract.component';


@NgModule({
  declarations: [
    AnxochComponent,
    LispractComponent
  ],
  imports: [
    CommonModule,
    AnexosRoutingModule
  ]
})
export class AnexosModule { }
