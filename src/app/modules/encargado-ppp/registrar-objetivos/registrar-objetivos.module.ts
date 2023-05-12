import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RegistrarObjetivosRoutingModule } from './registrar-objetivos-routing.module';
import { RegObjetivosComponent } from './reg-objetivos/reg-objetivos.component';
import { ObjetivosComponent } from './objetivos/objetivos.component';


@NgModule({
  declarations: [
    RegObjetivosComponent,
    ObjetivosComponent
  ],
  imports: [
    CommonModule,
    RegistrarObjetivosRoutingModule
  ]
})
export class RegistrarObjetivosModule { }
