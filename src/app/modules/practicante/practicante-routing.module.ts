import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'postulacion',
    loadChildren: () => import("./practicante-postulacion/practicante-postulacion.module").then(m => m.PracticantePostulacionModule)
  },
  {
    path: 'practica',
    loadChildren: () => import("./publicacion-notas/publicacion-notas.module").then(m => m.PublicacionNotasModule)
  },
  {
    path: '',
    loadChildren: () => import("./dashboard-practicante/dashboard-practicante.module").then(m => m.DashboardPracticanteModule)
  },
  {
    path: 'generate',
    loadChildren: () => import("./generate-obligaciones/generate-obligaciones.module").then(m => m.GenerateObligacionesModule)
  },
  {
    path: 'salud',
    loadChildren: () => import("./salud-ocupacional/salud-ocupacional.module").then(m => m.SaludOcupacionalModule)
  },
  {
    path: 'reporte',
    loadChildren: () => import("./reporte-semanal/reporte-semanal.module").then(m => m.ReporteSemanalModule)
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PracticanteRoutingModule { }
