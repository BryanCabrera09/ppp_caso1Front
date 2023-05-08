import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GenerateConvocatoriaRoutingModule } from './generate-convocatoria-routing.module';
import { GenConvocatoriaComponent } from './pages/gen-convocatoria/gen-convocatoria.component';
import { FormComponent } from './pages/gen-convocatoria/form/form.component';


@NgModule({
  declarations: [
    GenConvocatoriaComponent,
    FormComponent
  ],
  imports: [
    CommonModule,
    GenerateConvocatoriaRoutingModule
  ]
})
export class GenerateConvocatoriaModule { }
