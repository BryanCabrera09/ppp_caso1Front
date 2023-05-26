import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ReporteSemanalRoutingModule } from './reporte-semanal-routing.module';
import { Anexo6GenerateComponent } from './pages/anexo6-generate/anexo6-generate.component';


@NgModule({
  declarations: [
    Anexo6GenerateComponent
  ],
  imports: [
    CommonModule,
    ReporteSemanalRoutingModule,
    FormsModule
  ]
})
export class ReporteSemanalModule { }
