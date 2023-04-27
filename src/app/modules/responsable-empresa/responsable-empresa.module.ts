import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ResponsableEmpresaRoutingModule } from './responsable-empresa-routing.module';
import { WelcomeEmpresaComponent } from './welcome-empresa/welcome-empresa.component';


@NgModule({
  declarations: [
    WelcomeEmpresaComponent
  ],
  imports: [
    CommonModule,
    ResponsableEmpresaRoutingModule
  ]
})
export class ResponsableEmpresaModule { }
