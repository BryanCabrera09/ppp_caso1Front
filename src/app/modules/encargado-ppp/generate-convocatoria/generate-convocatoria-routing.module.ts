import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GenConvocatoriaComponent } from './pages/gen-convocatoria/gen-convocatoria.component';
import { FormComponent } from './pages/gen-convocatoria/form/form.component';
import { ProcesoSeleccionComponent } from './pages/gen-convocatoria/proceso-seleccion/proceso-seleccion.component';
const routes: Routes = [
  {
    path: 'lista',
    component: GenConvocatoriaComponent,
  },
  {
    path: 'form/:id',
    component: FormComponent,
  },
  {
    path: 'seleccion',
    component: ProcesoSeleccionComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GenerateConvocatoriaRoutingModule { }
