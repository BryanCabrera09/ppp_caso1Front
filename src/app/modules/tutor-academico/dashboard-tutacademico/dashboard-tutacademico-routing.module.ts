import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashComponent } from './pages/dash/dash.component';

const routes: Routes = [
  {
    path: '',
    component: DashComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardTutacademicoRoutingModule { }
