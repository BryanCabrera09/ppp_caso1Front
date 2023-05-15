import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardTutacademicoRoutingModule } from './dashboard-tutacademico-routing.module';
import { DashComponent } from './pages/dash/dash.component';


@NgModule({
  declarations: [
    DashComponent
  ],
  imports: [
    CommonModule,
    DashboardTutacademicoRoutingModule
  ]
})
export class DashboardTutacademicoModule { }
