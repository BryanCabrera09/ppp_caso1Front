import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardUserRoutingModule } from './dashboard-user-routing.module';
import { DashboardUsrComponent } from './pages/dashboard-usr/dashboard-usr.component';


@NgModule({
  declarations: [
    DashboardUsrComponent
  ],
  imports: [
    CommonModule,
    DashboardUserRoutingModule
  ]
})
export class DashboardUserModule { }
