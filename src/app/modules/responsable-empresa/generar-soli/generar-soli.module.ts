import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GenerarSoliRoutingModule } from './generar-soli-routing.module';
import { SoliEstComponent } from './soli-est/soli-est.component';
import { FormsModule } from '@angular/forms';
import { NgProgressModule } from 'ngx-progressbar';
import { ListaEmpresaComponent } from './lista-empresa/lista-empresa.component';
import { VerEmpresaComponent } from './ver-empresa/ver-empresa.component';


@NgModule({
  declarations: [
    SoliEstComponent,
    ListaEmpresaComponent,
    VerEmpresaComponent
  ],
  imports: [
    CommonModule,
    GenerarSoliRoutingModule,
    FormsModule,
    NgProgressModule
  ]
})
export class GenerarSoliModule { }
