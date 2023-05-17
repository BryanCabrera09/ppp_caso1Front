import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RegistrarObjetivosRoutingModule } from './registrar-objetivos-routing.module';
import { RegObjetivosComponent } from './reg-objetivos/reg-objetivos.component';
import { ObjetivosComponent } from './objetivos/objetivos.component';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    RegObjetivosComponent,
    ObjetivosComponent
  ],
  imports: [
    CommonModule,
    RegistrarObjetivosRoutingModule,
    ReactiveFormsModule,
    FormsModule
  ]
})
export class RegistrarObjetivosModule { }
