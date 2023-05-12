import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegistrarObjetivosModule } from './registrar-objetivos.module';
import { RegObjetivosComponent } from './reg-objetivos/reg-objetivos.component';

const routes: Routes = [
  {
    path: 'registrar-objetivos',
    component:RegObjetivosComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RegistrarObjetivosRoutingModule { }
