import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SaludOcupacionalRoutingModule } from './salud-ocupacional-routing.module';
import { ReporteSaludComponent } from './pages/reporte-salud/reporte-salud.component';
import { DialogModule } from 'primeng/dialog';


@NgModule({
  declarations: [
    ReporteSaludComponent
  ],
  imports: [
    CommonModule,
    SaludOcupacionalRoutingModule,
    FormsModule,
    DialogModule
  ]
})
export class SaludOcupacionalModule { }
