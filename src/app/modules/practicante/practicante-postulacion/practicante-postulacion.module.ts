import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PracticantePostulacionRoutingModule } from './practicante-postulacion-routing.module';
import { PostulacionComponent } from './pages/postulacion/postulacion.component';
import { SeleccionComponent } from './pages/seleccion/seleccion.component';
import { VistaComponent } from './pages/vista/vista.component';



@NgModule({
  declarations: [
    PostulacionComponent,
    SeleccionComponent,
    VistaComponent

  ],
  imports: [
    CommonModule,
    PracticantePostulacionRoutingModule
  ]
})
export class PracticantePostulacionModule { }
