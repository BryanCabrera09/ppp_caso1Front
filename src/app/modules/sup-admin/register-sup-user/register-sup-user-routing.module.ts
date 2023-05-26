import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterUserComponent } from './pages/register-user/register-user.component';

const routes: Routes = [
  {
    path: 'register',
    component: RegisterUserComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RegisterSupUserRoutingModule { }
