import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ConvocatoriaEmpresaRoutingModule } from './convocatoria-empresa-routing.module';
import { ListConvocatoriaComponent } from './pages/list-convocatoria/list-convocatoria.component';


@NgModule({
  declarations: [
    ListConvocatoriaComponent
  ],
  imports: [
    CommonModule,
    ConvocatoriaEmpresaRoutingModule
  ]
})
export class ConvocatoriaEmpresaModule { }
