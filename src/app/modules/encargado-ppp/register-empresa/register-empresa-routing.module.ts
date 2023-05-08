import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegEmpresaComponent } from './pages/reg-empresa/reg-empresa.component';
import { FormularioComponent } from './pages/reg-empresa/formulario/formulario.component';



const routes: Routes = [
  {
    path: 'register-empresa',
    component: RegEmpresaComponent,
  },
  {
    path: 'form',
    component: FormularioComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RegisterEmpresaRoutingModule { }
