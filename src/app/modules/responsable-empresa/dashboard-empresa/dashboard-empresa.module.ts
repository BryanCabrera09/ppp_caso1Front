import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardEmpresaRoutingModule } from './dashboard-empresa-routing.module';
import { DashComponent } from './pages/dash/dash.component';


@NgModule({
  declarations: [
    DashComponent
  ],
  imports: [
    CommonModule,
    DashboardEmpresaRoutingModule
  ]
})
export class DashboardEmpresaModule { }
