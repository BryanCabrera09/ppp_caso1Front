import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegistroComponent } from './pages/registro/registro.component';
import { PlanVisitasComponent } from './pages/plan-visitas/plan-visitas.component';


const routes: Routes = [
  {
    path: 'registro',
    component: RegistroComponent
  },
  {
    path: 'plan',
    component: PlanVisitasComponent
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RegistroVisitasRoutingModule { }
