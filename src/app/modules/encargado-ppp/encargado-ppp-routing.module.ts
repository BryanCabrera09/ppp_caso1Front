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
  {
    path: 'encargado',
    loadChildren: () => import("./aceptacion-practicantes/aceptacion-practicantes.module").then(m => m.AceptacionPracticantesModule)
  },
  {
    path: 'encargado',
    loadChildren: () => import("./register-tutor/register-tutor.module").then(m => m.RegisterTutorModule)

  },
  {
    path: 'objetivos',
    loadChildren: () => import("./registrar-objetivos/registrar-objetivos.module").then(m => m.RegistrarObjetivosModule)

  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EncargadoPppRoutingModule { }
