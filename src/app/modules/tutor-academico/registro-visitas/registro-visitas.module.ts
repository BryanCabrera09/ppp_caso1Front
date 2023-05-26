import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RegistroVisitasRoutingModule } from './registro-visitas-routing.module';
import { RegistroComponent } from './pages/registro/registro.component';


@NgModule({
  declarations: [
    RegistroComponent
  ],
  imports: [
    CommonModule,
    RegistroVisitasRoutingModule
  ]
})
export class RegistroVisitasModule { }
