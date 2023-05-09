import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PracticantePostulacionRoutingModule } from './practicante-postulacion-routing.module';
import { PostulacionComponent } from './pages/postulacion/postulacion.component';
import { SeleccionComponent } from './pages/seleccion/seleccion.component';


@NgModule({
  declarations: [
    PostulacionComponent,
    SeleccionComponent
  ],
  imports: [
    CommonModule,
    PracticantePostulacionRoutingModule
  ]
})
export class PracticantePostulacionModule { }
