import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WelcomeHomeComponent } from './modules/home/welcome-home/welcome-home.component';
import { WelcomeDirectorComponent } from './modules/director-carrera/welcome-director/welcome-director.component';
import { WelcomeEncargadoComponent } from './modules/encargado-ppp/welcome-encargado/welcome-encargado.component';
import { WelcomePracticanteComponent } from './modules/practicante/welcome-practicante/welcome-practicante.component';
import { WelcomeEmpresaComponent } from './modules/responsable-empresa/welcome-empresa/welcome-empresa.component';
import { WelcomeAcademicoComponent } from './modules/tutor-academico/welcome-academico/welcome-academico.component';
import { WelcomeEspecificoComponent } from './modules/tutor-especifico/welcome-especifico/welcome-especifico.component';
import { AuthComponent } from './modules/home/auth/pages/auth.component';
import { AuthGuard } from './core/guards/auth.guard';

const routes: Routes = [

  {
    path: '',
    component: WelcomeHomeComponent,
    loadChildren: () => import('./modules/home/home.module').then(m => m.HomeModule) // se importa un modulo que tiene routing es decir ruta 

  },
  {
    path: 'director-carrera',
    component: WelcomeDirectorComponent,
    loadChildren: () => import('./modules/director-carrera/director-carrera.module').then(m => m.DirectorCarreraModule) // se importa un modulo que tiene routing es decir ruta 

  },
  {
    path: 'encargado-practicas',
    component: WelcomeEncargadoComponent,
    loadChildren: () => import('./modules/encargado-ppp/encargado-ppp.module').then(m => m.EncargadoPppModule) // se importa un modulo que tiene routing es decir ruta 

  },
  {
    path: 'practicante', canActivate: [AuthGuard],
    component: WelcomePracticanteComponent,
    loadChildren: () => import('./modules/practicante/practicante.module').then(m => m.PracticanteModule) // se importa un modulo que tiene routing es decir ruta 

  },
  {
    path: 'respon-empresa',
    component: WelcomeEmpresaComponent,
    loadChildren: () => import('./modules/responsable-empresa/responsable-empresa.module').then(m => m.ResponsableEmpresaModule) // se importa un modulo que tiene routing es decir ruta 

  },
  {
    path: 'tutor-academico',
    component: WelcomeAcademicoComponent,
    loadChildren: () => import('./modules/tutor-academico/tutor-academico.module').then(m => m.TutorAcademicoModule) // se importa un modulo que tiene routing es decir ruta 

  },
  {
    path: 'tutor-especifico',
    component: WelcomeEspecificoComponent,
    loadChildren: () => import('./modules/tutor-especifico/tutor-especifico.module').then(m => m.TutorEspecificoModule) // se importa un modulo que tiene routing es decir ruta 

  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
