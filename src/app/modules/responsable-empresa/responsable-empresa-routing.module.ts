import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'soli',
    loadChildren: () => import("./generar-soli/generar-soli.module").then(m => m.GenerarSoliModule)
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ResponsableEmpresaRoutingModule { }
