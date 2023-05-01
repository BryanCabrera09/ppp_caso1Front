import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ResponsableEmpresaRoutingModule } from './responsable-empresa-routing.module';
import { WelcomeEmpresaComponent } from './welcome-empresa/welcome-empresa.component';
import { RouterModule } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [
    WelcomeEmpresaComponent
  ],
  imports: [
    CommonModule,
    ResponsableEmpresaRoutingModule,
    SharedModule,
    RouterModule
  ],
  exports: [
    WelcomeEmpresaComponent
  ]
})
export class ResponsableEmpresaModule { }
