import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GenConvocatoriaComponent } from './pages/gen-convocatoria/gen-convocatoria.component';
import { FormComponent } from './pages/gen-convocatoria/form/form.component';
const routes: Routes = [
  {
    path: 'lista',
    component: GenConvocatoriaComponent,
  },
  {
    path: 'form',
    component: FormComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GenerateConvocatoriaRoutingModule { }
