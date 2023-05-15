import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardEncargadoRoutingModule } from './dashboard-encargado-routing.module';
import { DashComponent } from './pages/dash/dash.component';


@NgModule({
  declarations: [
    DashComponent
  ],
  imports: [
    CommonModule,
    DashboardEncargadoRoutingModule
  ]
})
export class DashboardEncargadoModule { }
