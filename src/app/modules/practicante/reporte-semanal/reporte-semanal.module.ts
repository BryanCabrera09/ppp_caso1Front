import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReporteSemanalRoutingModule } from './reporte-semanal-routing.module';
import { A06GenerateComponent } from './pages/a06-generate/a06-generate.component';
import { Anexo6GenerateComponent } from './pages/anexo6-generate/anexo6-generate.component';


@NgModule({
  declarations: [
    A06GenerateComponent,
    Anexo6GenerateComponent
  ],
  imports: [
    CommonModule,
    ReporteSemanalRoutingModule
  ]
})
export class ReporteSemanalModule { }
