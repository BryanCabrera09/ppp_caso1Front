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
  {
    path: 'reporte',
    loadChildren: () => import("./reporte-semanal/reporte-semanal.module").then(m => m.ReporteSemanalModule)
  },
  {
    path: 'solicitud',
    loadChildren: () => import("./respuesta-postulacion/respuesta-postulacion.module").then(m => m.RespuestaPostulacionModule)
  },
  {
    path: 'anexos',
    loadChildren: () => import("./anexos/anexos.module").then(m => m.AnexosModule)
  },
  {
    path: 'solicitud',
    loadChildren: () => import("./lista-solicitudes/lista-solicitudes.module").then(m => m.ListaSolicitudesModule)
  },
  {
    path: 'presentar',
    loadChildren: () => import("./anexos-presentar/anexos-presentar.module").then(m => m.AnexosPresentarModule)
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PracticanteRoutingModule { }
