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
  {
    path: 'practicas',
    loadChildren: () => import("./practica-empresa/practica-empresa.module").then(m => m.PracticaEmpresaModule)
  },
  {
    path: 'tutoresp',
    loadChildren: () => import("./reg-tutor-especifico/reg-tutor-especifico.module").then(m => m.RegTutorEspecificoModule)
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ResponsableEmpresaRoutingModule { }
