import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import("./dashboard-user/dashboard-user.module").then(m => m.DashboardUserModule)
  },
  {
    path: '',
    loadChildren: () => import("./register-sup-user/register-sup-user.module").then(m => m.RegisterSupUserModule)
  },
  {
    path: '',
    loadChildren: () => import("./list-users/list-users.module").then(m => m.ListUsersModule)
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SupAdminRoutingModule { }
