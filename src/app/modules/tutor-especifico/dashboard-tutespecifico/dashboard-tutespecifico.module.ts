import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardTutespecificoRoutingModule } from './dashboard-tutespecifico-routing.module';
import { DashComponent } from './pages/dash/dash.component';


@NgModule({
  declarations: [
    DashComponent
  ],
  imports: [
    CommonModule,
    DashboardTutespecificoRoutingModule
  ]
})
export class DashboardTutespecificoModule { }
