import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AnexosRoutingModule } from './anexos-routing.module';
import { AnxochComponent } from './anxoch/anxoch.component';


@NgModule({
  declarations: [
    AnxochComponent
  ],
  imports: [
    CommonModule,
    AnexosRoutingModule
  ]
})
export class AnexosModule { }
