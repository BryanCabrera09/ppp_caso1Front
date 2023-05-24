import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardUsrComponent } from './pages/dashboard-usr/dashboard-usr.component';

const routes: Routes = [
  {
    path: '',
    component: DashboardUsrComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardUserRoutingModule { }
