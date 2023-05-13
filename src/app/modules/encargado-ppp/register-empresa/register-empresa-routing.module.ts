import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegEmpresaComponent } from './pages/reg-empresa/reg-empresa.component';
import { FormularioComponent } from './pages/reg-empresa/formulario/formulario.component';
import { FormularionRegConvenioComponent } from './pages/reg-empresa/formularion-reg-convenio/formularion-reg-convenio.component';

const routes: Routes = [
  {
    path: 'register-empresa',
    component: RegEmpresaComponent,
  },
  {
    path: 'form',
    component: FormularioComponent,
  },
  {
    path: 'register-convenio',
    component: FormularionRegConvenioComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RegisterEmpresaRoutingModule { }
