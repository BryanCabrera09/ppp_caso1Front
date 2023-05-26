import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import("./home-page/home-page.module").then(m => m.HomePageModule)
  },
  {
    path: '',
    loadChildren: () => import("./auth/auth.module").then(m => m.AuthModule)
  },
  {
    path: '',
    loadChildren: () => import("./register-user/register-user.module").then(m => m.RegisterUserModule)
  },
  {
    path: '',
    loadChildren: () => import("./notices/notices.module").then(m => m.NoticesModule)
  },
  {
    path: '',
    loadChildren: () => import("./info-ista/info-ista.module").then(m => m.InfoIstaModule)
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
