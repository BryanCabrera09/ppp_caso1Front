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
    path: 'practicas',
    loadChildren: () => import("./list-practicas/list-practicas.module").then(m => m.ListPracticasModule)
  },
  {
    path: 'tutoresp',
    loadChildren: () => import("./register-tutor/register-tutor.module").then(m => m.RegisterTutorModule)
  },
  {
    path: 'tutoracad',
    loadChildren: () => import("./register-tutor-academico/register-tutor-academico.module").then(m => m.RegisterTutorAcademicoModule)
  },
  {
    path: 'actividades',
    loadChildren: () => import("./actividades-propuestas/actividades-propuestas.module").then(m => m.ActividadesPropuestasModule)
  },
  {
    path: 'objetivos',
    loadChildren: () => import("./registrar-objetivos/registrar-objetivos.module").then(m => m.RegistrarObjetivosModule)
  },
  {
    path: 'convocatorias',
    loadChildren: () => import("./list-convocatorias/list-convocatorias.module").then(m => m.ListConvocatoriasModule)
  },
  {
    path: 'empresa',
    loadChildren: () => import("./aceptacion-empresa/aceptacion-empresa.module").then(m => m.AceptacionEmpresaModule)
  },
  {
    path: '',
    loadChildren: () => import("./dashboard-encargado/dashboard-encargado.module").then(m => m.DashboardEncargadoModule)
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EncargadoPppRoutingModule { }
