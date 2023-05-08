import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'empresa',
    loadChildren: () => import("./register-empresa/register-empresa.module").then(m => m.RegisterEmpresaModule)
  },

  {
    path: 'convocatoria',
    loadChildren: () => import("./generate-convocatoria/generate-convocatoria.module").then(m => m.GenerateConvocatoriaModule)
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EncargadoPppRoutingModule { }
