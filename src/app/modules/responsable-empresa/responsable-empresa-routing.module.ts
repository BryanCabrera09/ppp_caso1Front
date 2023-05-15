import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'soli',
    loadChildren: () => import("./generar-soli/generar-soli.module").then(m => m.GenerarSoliModule)
  },
  {
    path: '',
    loadChildren: () => import("./dashboard-empresa/dashboard-empresa.module").then(m => m.DashboardEmpresaModule)
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ResponsableEmpresaRoutingModule { }
