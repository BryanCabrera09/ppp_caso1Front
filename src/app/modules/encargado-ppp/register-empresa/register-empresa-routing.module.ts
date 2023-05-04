import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegEmpresaComponent } from './pages/reg-empresa/reg-empresa.component';

const routes: Routes = [
  {
    path: 'register',
    component: RegEmpresaComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RegisterEmpresaRoutingModule { }
