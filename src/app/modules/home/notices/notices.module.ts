import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NoticesRoutingModule } from './notices-routing.module';
import { ConvocatoriasComponent } from './convocatorias/convocatorias.component';


@NgModule({
  declarations: [
    ConvocatoriasComponent
  ],
  imports: [
    CommonModule,
    NoticesRoutingModule
  ]
})
export class NoticesModule { }
