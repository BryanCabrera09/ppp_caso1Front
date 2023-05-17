import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardPracticanteRoutingModule } from './dashboard-practicante-routing.module';
import { DashComponent } from './pages/dash/dash.component';


@NgModule({
  declarations: [
    DashComponent
  ],
  imports: [
    CommonModule,
    DashboardPracticanteRoutingModule
  ]
})
export class DashboardPracticanteModule { }
