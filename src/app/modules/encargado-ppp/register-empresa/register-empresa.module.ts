import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RegisterEmpresaRoutingModule } from './register-empresa-routing.module';
import { RegEmpresaComponent } from './pages/reg-empresa/reg-empresa.component';
import { FormsModule } from '@angular/forms';
import { FormularioComponent } from './pages/reg-empresa/formulario/formulario.component';
import { NgProgressModule } from 'ngx-progressbar';



@NgModule({
  declarations: [
    RegEmpresaComponent,
    FormularioComponent,
    
   
  ],
  imports: [
    CommonModule,
    RegisterEmpresaRoutingModule,
    FormsModule,
    NgProgressModule
  ]
})
export class RegisterEmpresaModule { }
