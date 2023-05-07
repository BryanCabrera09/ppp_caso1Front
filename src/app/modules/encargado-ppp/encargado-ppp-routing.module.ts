import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'empresa',
    loadChildren: () => import("./register-empresa/register-empresa.module").then(m => m.RegisterEmpresaModule)
  },
  {
    path: 'encargado',
    loadChildren: () => import("./aceptacion-practicantes/aceptacion-practicantes.module").then(m => m.AceptacionPracticantesModule)
  },
  {
    path: 'encargado',
    loadChildren: () => import("./register-tutor/register-tutor.module").then(m => m.RegisterTutorModule)
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EncargadoPppRoutingModule { }
