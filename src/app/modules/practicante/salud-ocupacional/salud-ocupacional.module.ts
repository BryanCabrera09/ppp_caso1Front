import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SaludOcupacionalRoutingModule } from './salud-ocupacional-routing.module';
import { ReporteSaludComponent } from './pages/reporte-salud/reporte-salud.component';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';


@NgModule({
  declarations: [
    ReporteSaludComponent
  ],
  imports: [
    CommonModule,
    SaludOcupacionalRoutingModule,
    FormsModule,
    DialogModule,
    ButtonModule
  ]
})
export class SaludOcupacionalModule { }
