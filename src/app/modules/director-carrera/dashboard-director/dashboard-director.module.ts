import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardDirectorRoutingModule } from './dashboard-director-routing.module';
import { DashComponent } from './pages/dash/dash.component';


@NgModule({
  declarations: [
    DashComponent
  ],
  imports: [
    CommonModule,
    DashboardDirectorRoutingModule
  ]
})
export class DashboardDirectorModule { }
